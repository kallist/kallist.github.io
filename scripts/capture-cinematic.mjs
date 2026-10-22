import { chromium, expect } from "@playwright/test";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const url = "http://127.0.0.1:4173/";
const folder = process.env.QA_ROUND === "draft" ? "../.qa/cinematic-draft/" : "../docs/visual-qa/cinematic/";
const dir = new URL(folder, import.meta.url);
await mkdir(dir, { recursive: true });
let server;
let browser;
const results = [];
async function shot(page, name, fullPage = false) {
  await sharp(await page.screenshot({ fullPage, animations: "disabled" })).webp({ quality: 87 }).toFile(fileURLToPath(new URL(name, dir)));
}
async function align(page, selector) {
  await page.locator(selector).evaluate(node => window.scrollTo(0, node.getBoundingClientRect().top + window.scrollY));
  await page.waitForTimeout(350);
}
try {
  if (!(await fetch(url).then(r => r.ok).catch(() => false))) {
    server = spawn(process.execPath, ["tests/static-server.mjs"], { stdio: "ignore" });
    for (let n = 0; n < 100; n++) {
      if (await fetch(url).then(r => r.ok).catch(() => false)) break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  browser = await chromium.launch();
  for (const width of [1440, 768, 390, 360]) {
    const page = await browser.newPage({ viewport: { width, height: width < 700 ? 844 : 1000 }, reducedMotion: "reduce" });
    const errors = [];
    const videos = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("request", request => { if (request.url().endsWith(".mp4")) videos.push(request.url()); });
    await page.goto(url, { waitUntil: "networkidle" });
    await shot(page, `hero-${width}.webp`);
    const heroActionsVisible = await page.locator(".v3-hero-actions").evaluate(node => node.getBoundingClientRect().bottom < window.innerHeight);
    for (const section of await page.locator(".v2-scene, #films, #education, #profile, #visual, #contact").all()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(120);
    }
    await align(page, ".v3-work-index");
    await shot(page, `work-index-${width}.webp`);
    if (width === 1440) {
      await page.getByRole("navigation", { name: "Case study overview" }).getByRole("link", { name: /CueParcel/ }).hover();
      await expect(page.locator(".v3-work-preview img")).toHaveAttribute("src", "/projects/cueparcel-lens.png");
      await shot(page, "work-index-hover-1440.webp");
    }
    await align(page, "#vowedit"); await shot(page, `vowedit-${width}.webp`);
    await align(page, "#films"); await shot(page, `films-heading-${width}.webp`);
    for (const id of ["cueparcel", "qingming", "singularity"]) {
      await page.locator(`#film-tab-${id}`).click();
      await align(page, ".v3-film-screen");
      await shot(page, `film-${id}-${width}.webp`);
    }
    expect(videos).toEqual([]);
    const beforePlayRequests = videos.length;
    if (width === 1440) {
      await page.getByRole("button", { name: /^Play / }).click();
      const player = page.locator("#films video");
      await player.evaluate(node => { node.muted = true; });
      await expect.poll(() => player.evaluate(node => node.currentTime)).toBeGreaterThan(0);
      await player.evaluate(node => { node.currentTime = 15; });
      await expect.poll(() => player.evaluate(node => node.currentTime)).toBeGreaterThanOrEqual(15);
      await shot(page, "film-playing-1440.webp");
      await page.locator("#film-tab-cueparcel").click();
    }
    await page.getByRole("button", { name: "Open chapter navigation" }).click();
    await shot(page, `index-${width}.webp`);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open chapter navigation" })).toBeFocused();
    await align(page, "#education"); await shot(page, `education-${width}.webp`);
    await align(page, "#visual"); await shot(page, `visual-${width}.webp`);
    await align(page, "#contact"); await shot(page, `contact-${width}.webp`);
    await shot(page, `full-${width}.webp`, true);
    await page.goto(`${url}work/vowedit/`, { waitUntil: "networkidle" });
    await shot(page, `detail-${width}.webp`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await page.goto(url); await page.getByRole("button", { name: "中文", exact: true }).click();
    await shot(page, `hero-zh-${width}.webp`);
    await align(page, "#films"); await shot(page, `films-zh-${width}.webp`);
    results.push({ width, heroActionsVisible, beforePlayVideoRequests: beforePlayRequests, detailOverflow: overflow, homeOverflow: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), pageErrors: errors });
    await page.close();
  }
  await writeFile(new URL("capture-results.json", dir), JSON.stringify({ url, browser: "Automated Chromium", results }, null, 2) + "\n");
  console.log(JSON.stringify(results));
} finally { await browser?.close(); server?.kill(); }
