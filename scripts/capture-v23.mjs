import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const url = process.env.QA_URL ?? "http://127.0.0.1:4173/";
const directory = new URL("../docs/visual-qa/v23/", import.meta.url);
await mkdir(directory, { recursive: true });
let localServer;
if (url.startsWith("http://127.0.0.1:4173/") && !(await fetch(url).then((response) => response.ok).catch(() => false))) {
  localServer = spawn(process.execPath, ["tests/static-server.mjs"], { stdio: "ignore" });
  for (let attempt = 0; attempt < 50; attempt++) {
    if (await fetch(url).then((response) => response.ok).catch(() => false)) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!(await fetch(url).then((response) => response.ok).catch(() => false))) throw new Error("Static QA server did not start");
}
const browser = await chromium.launch();
const results = { url, viewports: [], motion: null };

async function save(bytes, name) {
  await sharp(bytes).webp({ quality: 86, effort: 4 }).toFile(fileURLToPath(new URL(name, directory)));
}

async function capture(page, name, fullPage = false, animations = "disabled") {
  await save(await page.screenshot({ fullPage, animations }), name);
}

async function captureLoop(page, name) {
  const encoded = await page.locator("canvas[data-living-ascii-loop]").evaluate((node) => node.toDataURL("image/png").split(",")[1]);
  const png = Buffer.from(encoded, "base64");
  const { width, height } = page.viewportSize();
  const image = await sharp({ create: { width, height, channels: 4, background: "#eeeae2" } }).composite([{ input: png }]).png().toBuffer();
  await save(image, name);
  return image;
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
  await page.waitForTimeout(400);
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
      await capture(page, "intro-early-1440.webp", false, "allow");
      await page.waitForTimeout(550);
      await capture(page, "intro-loop-1440.webp", false, "allow");
      await page.waitForTimeout(550);
      await capture(page, "intro-page-1440.webp", false, "allow");
    } else if (width === 390) {
      await page.waitForTimeout(500);
      await capture(page, "intro-loop-390.webp", false, "allow");
      await page.waitForTimeout(650);
      await capture(page, "intro-resolved-390.webp", false, "allow");
    }
    await page.locator("[data-global-context-loop][data-loop-phase=ready]").waitFor();
    await page.waitForTimeout(300);
    await capture(page, `hero-${width}.webp`);
    if (width === 1440) {
      const before = await captureLoop(page, "loop-isolated-0.webp");
      const metricsBefore = await client.send("Performance.getMetrics");
      await page.waitForTimeout(5500);
      const after = await captureLoop(page, "loop-isolated-5s.webp");
      const metricsAfter = await client.send("Performance.getMetrics");
      await page.mouse.move(720, 400);
      await page.waitForTimeout(650);
      const pointer = await captureLoop(page, "loop-pointer.webp");
      const metric = (report, name) => report.metrics.find((item) => item.name === name)?.value ?? 0;
      results.motion = {
        intervalMs: 5500,
        changedPixelsOverInterval: await changedPixels(before, after),
        changedPixelsWithPointerAndTime: await changedPixels(after, pointer),
        taskSeconds: +(metric(metricsAfter, "TaskDuration") - metric(metricsBefore, "TaskDuration")).toFixed(2),
        scriptSeconds: +(metric(metricsAfter, "ScriptDuration") - metric(metricsBefore, "ScriptDuration")).toFixed(2),
      };
      for (const [selector, name] of [
        [".v2-repo-scene", "repobound-1440.webp"], [".v2-agent-scene", "agent-studio-1440.webp"],
        ["#education", "education-1440.webp"], ["#profile", "method-1440.webp"],
        ["#visual", "visual-practice-1440.webp"], ["#contact", "contact-1440.webp"],
      ]) await section(page, selector, name);
    } else if (width === 768) {
      for (const [selector, name] of [[".v2-repo-scene", "repobound-768.webp"], ["#education", "education-768.webp"], ["#visual", "visual-practice-768.webp"]]) await section(page, selector, name);
    } else {
      for (const [selector, name] of [[".v2-repo-scene", "repobound-390.webp"], ["#education", "education-390.webp"], ["#visual", "visual-practice-390.webp"]]) await section(page, selector, name);
    }
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * .75) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 65));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(() => [...document.querySelectorAll(".v2-case-media img")].every((node) => node.complete && node.naturalWidth > 0));
    await page.waitForTimeout(700);
    await capture(page, `full-${width}.webp`, true);
    results.viewports.push({ width, height, glyphs: Number(await page.locator("[data-global-context-loop]").getAttribute("data-glyph-count")), overflowPx: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) });
    await page.close();
  }
  await writeFile(new URL("capture-results.json", directory), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
  localServer?.kill();
}
