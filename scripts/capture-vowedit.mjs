import { chromium, expect } from "@playwright/test";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const url = "http://127.0.0.1:4173/";
const directory = new URL("../docs/visual-qa/vowedit/", import.meta.url);
await mkdir(directory, { recursive: true });
let server;
let browser;
const results = [];
async function capture(page, name, fullPage = false) {
  await sharp(await page.screenshot({ fullPage, animations: "disabled" }))
    .webp({ quality: 88 }).toFile(fileURLToPath(new URL(name, directory)));
}
async function align(page, selector) {
  await page.locator(selector).evaluate(node => window.scrollTo(0, node.getBoundingClientRect().top + window.scrollY));
  await page.waitForTimeout(500);
}
try {
  if (!(await fetch(url).then(response => response.ok).catch(() => false))) {
    server = spawn(process.execPath, ["tests/static-server.mjs"], { stdio: "ignore" });
    for (let i = 0; i < 50; i++) {
      if (await fetch(url).then(response => response.ok).catch(() => false)) break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  browser = await chromium.launch();
  for (const width of [1440, 390, 360]) {
    const page = await browser.newPage({ viewport: { width, height: width === 1440 ? 1000 : 844 }, reducedMotion: "reduce" });
    const errors = [];
    const speculativePrefetch404 = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => {
      const path = new URL(response.url()).pathname;
      // The Windows static export has an existing non-fatal segment-prefetch
      // path mismatch. Record it separately; image, HTML and JS failures fail QA.
      if (response.status() === 404 && /\/__next\.[^/]+\.txt$/.test(path)) speculativePrefetch404.push(path);
      else if (response.status() >= 400) errors.push(`${response.status()} ${path}`);
    });
    await page.goto(url, { waitUntil: "networkidle" });
    // Traverse the actual page to register reveals and load all lazy images.
    for (const scene of await page.locator(".v2-scene, #education, #profile, #visual, #contact").all()) {
      await scene.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
    }
    await align(page, "#vowedit");
    await expect(page.locator("#vowedit img")).toBeVisible();
    await expect.poll(() => page.locator("#vowedit img").evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
    await capture(page, `homepage-${width}.webp`);
    await align(page, ".v2-vow-media");
    await capture(page, `homepage-image-${width}.webp`);
    const homeOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await page.getByRole("button", { name: "Open chapter navigation" }).click();
    const projectIndex = page.getByRole("navigation", { name: "Project index" });
    await projectIndex.getByRole("link", { name: /VowEdit/ }).scrollIntoViewIfNeeded();
    await capture(page, `index-${width}.webp`);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open chapter navigation" })).toBeFocused();
    await page.locator("#vowedit .v2-case-link").click();
    await expect(page).toHaveURL(/\/work\/vowedit\/$/);
    await page.reload({ waitUntil: "networkidle" });
    await capture(page, `detail-hero-${width}.webp`);
    for (const image of await page.locator(".project-figure img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
    }
    await align(page, ".case-body");
    await capture(page, `detail-body-${width}.webp`);
    await page.locator(".evidence-list a").first().focus();
    await capture(page, `detail-evidence-${width}.webp`);
    await capture(page, `detail-full-${width}.webp`, true);
    const detailOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(homeOverflow).toBeLessThanOrEqual(1);
    expect(detailOverflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
    results.push({ width, homeOverflow, detailOverflow, errors, speculativePrefetch404: [...new Set(speculativePrefetch404)], directLoadAndRefresh: "PASS", indexEscapeFocusReturn: "PASS" });
    if (width === 1440) {
      await page.goto(url);
      await align(page, "#vowedit");
      const word = page.locator("#vowedit-title .v2-word");
      const before = await word.evaluate(node => ({ color: getComputedStyle(node).color, width: node.getBoundingClientRect().width }));
      await word.hover();
      await page.waitForTimeout(300);
      const after = await word.evaluate(node => ({ color: getComputedStyle(node).color, width: node.getBoundingClientRect().width }));
      expect(before.color).not.toBe(after.color);
      expect(before.width).toBe(after.width);
      results[results.length - 1].headingHover = { before, after, status: "PASS" };
      await capture(page, "homepage-hover-1440.webp");
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await expect(page.locator(".v2-global-loop")).toHaveAttribute("data-loop-motion", "running");
      await page.mouse.move(10, 10);
      await page.waitForTimeout(1000);
      await capture(page, "homepage-motion-1440.webp");
    }
    await page.close();
  }
  await writeFile(new URL("capture-results.json", directory), JSON.stringify({ url, browser: "Automated Chromium", results }, null, 2) + "\n");
  console.log(JSON.stringify(results));
} finally {
  await browser?.close();
  server?.kill();
}
