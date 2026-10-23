import { chromium, expect } from "@playwright/test";
import sharp from "sharp";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const dir = new URL("../docs/visual-qa/theatre/", import.meta.url);
await mkdir(dir, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "no-preference", recordVideo: { dir: fileURLToPath(dir), size: { width: 1440, height: 1000 } } });
const page = await context.newPage();
const frames = [];
const video = page.video();
async function shot(name) {
  await sharp(await page.screenshot()).webp({ quality: 87 }).toFile(fileURLToPath(new URL(name, dir)));
  frames.push({ file: name, elapsedSinceNavigation: Math.round(await page.evaluate(() => performance.now())) });
}
try {
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "domcontentloaded" });
  for (const [index, wait] of [150, 400, 700, 1000].entries()) { await page.waitForTimeout(wait); await shot(`entry-${index + 1}.webp`); }
  await page.mouse.move(1040, 330); await page.waitForTimeout(500); await shot("pointer-perspective.webp");
  for (const selector of ["[data-theatre-band]", ".v3-work-index", "#vowedit", "#repobound", "#cueparcel", "#agent-studio", "#skin-lesion-ai", ".v4-band--film", "#films", "#education", "#profile", "#visual", "#contact"]) {
    const target = await page.locator(selector).first().evaluate(node => node.getBoundingClientRect().top + scrollY);
    while (Math.abs(await page.evaluate(() => scrollY) - target) > 40) {
      const current = await page.evaluate(() => scrollY);
      const next = current + Math.sign(target - current) * Math.min(180, Math.abs(target - current));
      await page.evaluate(value => window.scrollTo({ top: value, behavior: "instant" }), next);
      await page.waitForTimeout(70);
      if (await page.evaluate(() => scrollY) === current) break;
    }
    await page.waitForTimeout(450);
    if (selector === ".v3-work-index") await page.getByRole("navigation", { name: "Case study overview" }).getByRole("link", { name: /RepoBound/ }).hover();
    if (selector.startsWith("[data") || selector === ".v4-band--film" || selector === "#contact") await shot(selector === "#contact" ? "ending-motion.webp" : selector.startsWith("[data") ? "work-band-motion.webp" : "film-band-motion.webp");
  }
  await page.getByRole("button", { name: "Pause ambient motion", exact: true }).click();
  await expect(page.locator("[data-global-context-loop]")).toHaveAttribute("data-loop-motion", "static");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" })); await page.waitForTimeout(250); await shot("paused-opening.webp");
  await page.getByRole("button", { name: "Resume ambient motion", exact: true }).click();
  await expect(page.locator("[data-global-context-loop]")).toHaveAttribute("data-loop-motion", "running");
} finally {
  await context.close();
  if (video) await rename(await video.path(), fileURLToPath(new URL("motion-preview.webm", dir)));
  await browser.close();
  await writeFile(new URL("motion-captures.json", dir), JSON.stringify({ browser: "Automated Chromium", motion: "no-preference", frames, note: "Real-time browser recording and discrete captures; timings include capture overhead, not controlled benchmark frames." }, null, 2) + "\n");
}
