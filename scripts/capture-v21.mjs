import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const url = process.env.QA_URL ?? "http://127.0.0.1:4173/";
const directory = new URL("../docs/visual-qa/v2.1/", import.meta.url);
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
const results = [];

try {
  for (const width of [1440, 768, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.screenshot({ path: fileURLToPath(new URL(`full-${width}.png`, directory)), fullPage: true, animations: "disabled" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    results.push({ width, overflow });
    if (width === 1440 || width === 390) {
      await page.locator("#education").scrollIntoViewIfNeeded();
      await page.locator("#education").screenshot({ path: fileURLToPath(new URL(`education-${width}.png`, directory)), animations: "disabled" });
    }
    if (width === 1440) {
      await page.locator("#visual").scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);
      await page.locator("#visual").screenshot({ path: fileURLToPath(new URL("gallery-desktop.png", directory)) });
      const track = page.locator(".v21-gallery-track--main");
      const before = await track.evaluate((node) => getComputedStyle(node).transform);
      await page.waitForTimeout(2200);
      const after = await track.evaluate((node) => getComputedStyle(node).transform);
      await page.locator("#visual").screenshot({ path: fileURLToPath(new URL("gallery-motion-later.png", directory)) });
      results.push({ galleryMotion: { before, after, changed: before !== after } });
      await page.locator("#profile").scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);
      await page.screenshot({ path: fileURLToPath(new URL("tree-with-content.png", directory)), animations: "disabled" });
      await page.addStyleTag({ content: ".v2-home > :not(.v2-global-tree) { visibility: hidden !important; } .v2-home { background: #e9e6df !important; } .v2-global-tree { opacity: .65 !important; mix-blend-mode: normal !important; mask-image: none !important; }" });
      await page.screenshot({ path: fileURLToPath(new URL("tree-isolated.png", directory)), animations: "disabled" });
    }
    await page.close();
  }
  await writeFile(new URL("capture-results.json", directory), JSON.stringify({ url, results }, null, 2));
  console.log(JSON.stringify({ url, results }, null, 2));
} finally {
  await browser.close();
}
