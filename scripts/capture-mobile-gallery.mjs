import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const url = "http://127.0.0.1:4173/";
const directory = new URL("../docs/visual-qa/mobile-gallery/", import.meta.url);
await mkdir(directory, { recursive: true });
let server;
if (!(await fetch(url).then((response) => response.ok).catch(() => false))) {
  server = spawn(process.execPath, ["tests/static-server.mjs"], { stdio: "ignore" });
  for (let attempt = 0; attempt < 50; attempt++) {
    if (await fetch(url).then((response) => response.ok).catch(() => false)) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!(await fetch(url).then((response) => response.ok).catch(() => false))) throw new Error("Static QA server did not start");
}
const browser = await chromium.launch();
const results = [];
async function capture(page, name, fullPage = false) {
  const png = await page.screenshot({ fullPage, animations: "disabled" });
  await sharp(png).webp({ quality: 86, effort: 4 }).toFile(fileURLToPath(new URL(name, directory)));
}
try {
  for (const width of [360, 375, 390, 430, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width > 640 ? 900 : 844 }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.locator("[data-global-context-loop][data-loop-phase=ready]").waitFor();
    await page.locator("#visual").scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await capture(page, `visual-practice-${width}.webp`);
    if (width === 390) {
      const gallery = page.locator(".v21-gallery");
      await gallery.getByRole("button", { name: "Next artwork" }).click();
      await gallery.locator('[data-active-index="2"]').waitFor();
      await page.waitForTimeout(300);
      await capture(page, "visual-practice-390-item-02.webp");
      await gallery.getByRole("button", { name: "Next artwork" }).click();
      await gallery.locator('[data-active-index="3"]').waitFor();
      await page.waitForTimeout(300);
      await capture(page, "visual-practice-390-item-03.webp");
      await gallery.getByRole("button", { name: "Next artwork" }).click();
      await gallery.locator('[data-active-index="4"]').waitFor();
      await gallery.getByRole("button", { name: "Next artwork" }).click();
      await gallery.locator('[data-active-index="5"]').waitFor();
      await page.waitForTimeout(300);
      await capture(page, "visual-practice-390-item-05.webp");
    }
    if ([390, 768, 1440].includes(width)) await capture(page, `full-${width}.webp`, true);
    results.push({ width, overflowPx: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) });
    await page.close();
  }
  await writeFile(new URL("capture-results.json", directory), JSON.stringify({ url, results }, null, 2));
  console.log(JSON.stringify(results));
} finally {
  await browser.close();
  server?.kill();
}
