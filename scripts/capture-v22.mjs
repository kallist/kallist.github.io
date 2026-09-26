import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const url = process.env.QA_URL ?? "http://127.0.0.1:4173/";
const directory = new URL("../docs/visual-qa/v22/", import.meta.url);
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
const results = { url, viewports: [], motion: null };

async function capture(page, name, fullPage = false, animations = "disabled") {
  const png = await page.screenshot({ fullPage, animations });
  await sharp(png).webp({ quality: 86, effort: 4 }).toFile(fileURLToPath(new URL(name, directory)));
}

async function captureTree(page, name) {
  const encoded = await page.locator("canvas[data-living-ascii-tree]").evaluate((node) => node.toDataURL("image/png").split(",")[1]);
  const png = Buffer.from(encoded, "base64");
  const { width, height } = page.viewportSize();
  const composite = await sharp({ create: { width, height, channels: 4, background: "#eeeae2" } }).composite([{ input: png }]).png().toBuffer();
  await sharp(composite).webp({ quality: 86, effort: 4 }).toFile(fileURLToPath(new URL(name, directory)));
  return composite;
}

async function changedPixels(first, second) {
  const a = await sharp(first).raw().toBuffer();
  const b = await sharp(second).raw().toBuffer();
  let changed = 0;
  for (let index = 0; index < a.length; index += 4) {
    if (Math.abs(a[index] - b[index]) + Math.abs(a[index + 1] - b[index + 1]) + Math.abs(a[index + 2] - b[index + 2]) > 12) changed++;
  }
  return changed;
}

async function section(page, selector, name) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await capture(page, name);
}

try {
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    const client = width === 1440 ? await page.context().newCDPSession(page) : null;
    if (client) await client.send("Performance.enable");
    await page.goto(url, { waitUntil: "domcontentloaded" });
    if (width === 1440) {
      await page.waitForTimeout(150);
      await capture(page, "intro-trunk-1440.webp", false, "allow");
      await page.waitForTimeout(450);
      await capture(page, "intro-branches-1440.webp", false, "allow");
      await page.waitForTimeout(600);
      await capture(page, "intro-page-1440.webp", false, "allow");
    }
    await page.locator("[data-global-ascii-tree][data-tree-phase=ready]").waitFor();
    await page.waitForTimeout(350);
    await capture(page, `hero-${width}.webp`);
    if (width === 1440) {
      const before = await captureTree(page, "tree-isolated-0.webp");
      const metricsBefore = await client.send("Performance.getMetrics");
      await page.waitForTimeout(5500);
      const after = await captureTree(page, "tree-isolated-5s.webp");
      const metricsAfter = await client.send("Performance.getMetrics");
      await page.mouse.move(750, 335);
      await page.waitForTimeout(700);
      const pointer = await captureTree(page, "tree-pointer.webp");
      const metric = (report, name) => report.metrics.find((item) => item.name === name)?.value ?? 0;
      results.motion = {
        intervalMs: 5500,
        changedPixelsOverInterval: await changedPixels(before, after),
        changedPixelsWithPointerAndTime: await changedPixels(after, pointer),
        taskSeconds: +(metric(metricsAfter, "TaskDuration") - metric(metricsBefore, "TaskDuration")).toFixed(2),
        scriptSeconds: +(metric(metricsAfter, "ScriptDuration") - metric(metricsBefore, "ScriptDuration")).toFixed(2),
      };
      for (const [selector, name] of [
        [".v2-repo-scene", "repobound-1440.webp"], [".v2-cue-scene", "cueparcel-1440.webp"],
        [".v2-agent-scene", "agent-studio-1440.webp"], ["#education", "education-1440.webp"],
        ["#visual", "visual-practice-1440.webp"], ["#contact", "contact-1440.webp"],
      ]) await section(page, selector, name);
    } else if (width === 768) {
      await section(page, ".v2-repo-scene", "repobound-768.webp");
      await section(page, "#education", "education-768.webp");
    } else {
      await section(page, ".v2-repo-scene", "repobound-390.webp");
      await section(page, "#education", "education-390.webp");
      await section(page, "#visual", "visual-practice-390.webp");
    }
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * .75) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 65));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(() => [...document.querySelectorAll(".v2-case-media img")].every((node) => node.complete && node.naturalWidth > 0));
    await page.waitForTimeout(900);
    await capture(page, `full-${width}.webp`, true);
    results.viewports.push({ width, height, glyphs: Number(await page.locator("[data-global-ascii-tree]").getAttribute("data-glyph-count")), overflowPx: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) });
    await page.close();
  }
  await writeFile(new URL("capture-results.json", directory), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
