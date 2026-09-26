import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const url = process.env.QA_URL ?? "http://127.0.0.1:4173/";
const directory = new URL("../docs/visual-qa/v2.1-patch/", import.meta.url);
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
const results = [];

async function capture(page, name, fullPage = false) {
  await page.screenshot({ path: fileURLToPath(new URL(name, directory)), fullPage });
}

try {
  for (const width of [1440, 768, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    if (width === 1440) {
      await capture(page, "intro-start-1440.png");
      await page.waitForTimeout(650);
      await capture(page, "intro-tree-before-page-1440.png");
      results.push({ introTreeOpacity: await page.locator(".v2-global-tree").evaluate((node) => getComputedStyle(node).opacity), introHeroOpacity: await page.locator(".v2-hero .v2-frame").evaluate((node) => getComputedStyle(node).opacity) });
      // Sample the actual CSS timeline at 1.6s without relying on screenshot latency.
      await page.evaluate(() => {
        for (const selector of [".v2-global-tree", ".v2-hero .v2-frame", ".v2-hero .v2-pattern", ".v2-rail", ".v2-nav-trigger", ".v21-language-switch"]) {
          const animation = document.querySelector(selector)?.getAnimations()[0];
          if (animation) { animation.pause(); animation.currentTime = 1600; }
        }
      });
      await capture(page, "intro-page-emerge-1440.png");
      results.push({ emergeTreeOpacity: await page.locator(".v2-global-tree").evaluate((node) => getComputedStyle(node).opacity), emergeHeroOpacity: await page.locator(".v2-hero .v2-frame").evaluate((node) => getComputedStyle(node).opacity) });
      await page.evaluate(() => {
        for (const selector of [".v2-global-tree", ".v2-hero .v2-frame", ".v2-hero .v2-pattern", ".v2-rail", ".v2-nav-trigger", ".v21-language-switch"]) {
          document.querySelector(selector)?.getAnimations()[0]?.finish();
        }
      });
    }
    await page.waitForTimeout(2200);
    if (width === 1440) await capture(page, "hero-complete-1440.png");
    // A full-page capture alone does not load below-fold images or finish
    // scroll-triggered reveals. Walk the actual page first.
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * .8) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((resolve) => setTimeout(resolve, 85));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForFunction(() => [...document.querySelectorAll(".v2-case-media img")].every((image) => image.complete && image.naturalWidth > 0));
    await page.waitForTimeout(900);
    await capture(page, `full-${width}.png`, true);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    results.push({ width, overflow });

    await page.locator("#visual").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.locator("#visual").screenshot({ path: fileURLToPath(new URL(`gallery-${width}.png`, directory)) });
    if (width === 1440) {
      const track = page.locator(".v21-gallery-track--main");
      const before = await track.evaluate((node) => getComputedStyle(node).transform);
      await page.waitForTimeout(1400);
      const after = await track.evaluate((node) => getComputedStyle(node).transform);
      await page.locator("#visual").screenshot({ path: fileURLToPath(new URL("gallery-motion-1440.png", directory)) });
      results.push({ galleryMotion: { before, after, changed: before !== after } });
      await page.getByRole("button", { name: "Pause motion" }).click();
      await page.locator(".v21-gallery-track--main .v21-gallery-set:not([aria-hidden]) .v21-gallery-item").nth(4).scrollIntoViewIfNeeded();
      await page.locator("#visual").screenshot({ path: fileURLToPath(new URL("gallery-05-1440.png", directory)) });
      await page.locator("#work").scrollIntoViewIfNeeded();
      await page.waitForTimeout(750);
      await capture(page, "tree-with-work-1440.png");
    }
    await page.locator("#education").scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.locator("#education").screenshot({ path: fileURLToPath(new URL(`education-${width}.png`, directory)) });
    if (width === 1440) {
      await page.addStyleTag({ content: ".v2-home > :not(.v2-global-tree) { visibility: hidden !important; } .v2-home { background: #e9e6df !important; } .v2-global-tree { opacity: 1 !important; mix-blend-mode: normal !important; animation: none !important; }" });
      await capture(page, "tree-isolated-1440.png");
    }
    await page.close();
  }
  await writeFile(new URL("capture-results.json", directory), JSON.stringify({ url, results }, null, 2));
  console.log(JSON.stringify({ url, results }, null, 2));
} finally {
  await browser.close();
}
