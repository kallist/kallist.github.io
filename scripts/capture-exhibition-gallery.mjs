import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const url = "http://127.0.0.1:4173/";
const directory = new URL("../docs/visual-qa/exhibition-gallery/", import.meta.url);
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
async function capture(page, name, selector, fullPage = false) {
  const png = selector ? await page.locator(selector).screenshot({ animations: "allow" }) : await page.screenshot({ fullPage, animations: "allow" });
  await sharp(png).webp({ quality: 86, effort: 4 }).toFile(fileURLToPath(new URL(name, directory)));
}

try {
  for (const width of [360, 375, 390, 430, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width > 640 ? 900 : 844 }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => (document.querySelector(".v21-exhibition-window")?.scrollLeft ?? 0) > 0, null, { timeout: 15_000 });
    await page.locator("#visual").scrollIntoViewIfNeeded();
    const gallery = page.locator(".v21-gallery");
    if (width > 640) await gallery.getByRole("button", { name: "Pause motion" }).click();
    async function show(index) {
      await gallery.locator(".v21-exhibition-window").evaluate((node, workIndex) => {
        const count = Number(node.closest(".v21-gallery").dataset.galleryCount);
        const item = node.querySelectorAll(".v21-exhibition-item")[count + workIndex - 1];
        const rect = item.getBoundingClientRect();
        const viewport = node.getBoundingClientRect();
        node.scrollLeft += rect.left + rect.width / 2 - viewport.left - viewport.width / 2;
      }, index);
      await page.waitForFunction((expected) => document.querySelector(".v21-gallery")?.getAttribute("data-active-index") === String(expected), index);
      await page.waitForTimeout(1200);
    }
    await show(1);
    await page.waitForFunction(() => [...document.querySelectorAll(".v21-exhibition-item[data-prominence=active] img, .v21-exhibition-item[data-prominence=near] img")].every((image) => image.complete && image.naturalWidth > 0), null, { timeout: 10_000 });
    await capture(page, `visual-${width}-01.webp`, ".v21-gallery");
    if ([390, 768, 1440].includes(width)) {
      for (const index of [2, 3, 5]) {
        await show(index);
        await capture(page, `visual-${width}-${String(index).padStart(2, "0")}.webp`, ".v21-gallery");
      }
    }
    if (width === 1440) {
      await gallery.getByRole("button", { name: "Resume motion" }).click();
      await page.mouse.move(10, 10);
      await page.waitForTimeout(4300);
      const before = await page.locator(".v21-exhibition-window").evaluate((node) => node.scrollLeft);
      await page.waitForTimeout(2200);
      const after = await page.locator(".v21-exhibition-window").evaluate((node) => node.scrollLeft);
      await capture(page, "visual-1440-motion.webp", ".v21-gallery");
      results.push({ width, autoMotionPx: +(after - before).toFixed(2), overflowPx: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) });
    } else {
      results.push({ width, overflowPx: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) });
    }
    if ([390, 768, 1440].includes(width)) await capture(page, `full-${width}.webp`, null, true);
    await page.close();
  }
  await writeFile(new URL("capture-results.json", directory), JSON.stringify({ url, results }, null, 2));
  console.log(JSON.stringify(results));
} finally {
  await browser.close();
  server?.kill();
}
