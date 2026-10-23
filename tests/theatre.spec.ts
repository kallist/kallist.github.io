import { test, expect, type Locator } from "@playwright/test";

async function canvasFrame(canvas: Locator) {
  return canvas.evaluate((node: HTMLCanvasElement) => node.toDataURL());
}

// Sample distinct browser rendering opportunities. A static state label alone
// cannot prove that the renderer stopped producing new pixels.
async function consecutiveFrames(canvas: Locator, count = 20) {
  return canvas.evaluate(async (node: HTMLCanvasElement, samples) => {
    const frames: string[] = [];
    for (let index = 0; index < samples; index++) {
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      frames.push(node.toDataURL());
    }
    return new Set(frames).size;
  }, count);
}

test("pointer position changes rendered context geometry at an identical animation time", async ({ browser }) => {
  const contexts = await Promise.all([browser.newContext({ viewport: { width: 1440, height: 900 } }), browser.newContext({ viewport: { width: 1440, height: 900 } })]);
  try {
    const pages = await Promise.all(contexts.map(context => context.newPage()));
    for (const page of pages) {
      // Synchronize only the browser clock. Both pages use the real renderer;
      // equal initial pixels rule out ambient animation as the cause of a diff.
      await page.clock.install({ time: new Date("2026-10-23T00:00:00Z") });
      await page.clock.pauseAt(new Date("2026-10-23T00:00:01Z"));
      await page.goto("/");
      await expect(page.locator("[data-global-context-loop]")).toHaveAttribute("data-glyph-count", /\d+/);
      await page.clock.runFor(3_000);
    }
    const canvases = pages.map(page => page.locator("[data-living-ascii-loop]"));
    expect(await canvasFrame(canvases[0])).toBe(await canvasFrame(canvases[1]));
    await pages[0].mouse.move(200, 400);
    await pages[1].mouse.move(1200, 400);
    for (const page of pages) await page.clock.runFor(1_000);
    expect(await canvasFrame(canvases[0])).not.toBe(await canvasFrame(canvases[1]));
  } finally {
    await Promise.all(contexts.map(context => context.close()));
  }
});

test("opening scroll changes the actual camera projection and pointer moves the action", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const loop = page.locator("[data-global-context-loop]");
  const canvas = loop.locator("canvas");
  await expect(loop).toHaveAttribute("data-loop-phase", "ready");
  await expect(loop).toHaveAttribute("data-loop-palette", "light");
  await expect(page.locator("#hero img")).toHaveCount(0);
  const action = page.locator(".v3-hero-actions a").first();
  const bounds = await action.boundingBox();
  if (!bounds) throw new Error("Hero action has no bounds");
  await page.mouse.move(bounds.x + bounds.width * .15, bounds.y + bounds.height * .35);
  await expect.poll(() => action.evaluate(node => new DOMMatrixReadOnly(getComputedStyle(node).transform).m41)).toBeLessThan(-1);
  await page.mouse.move(bounds.x + bounds.width * .85, bounds.y + bounds.height * .65);
  await expect.poll(() => action.evaluate(node => new DOMMatrixReadOnly(getComputedStyle(node).transform).m41)).toBeGreaterThan(1);
  const before = await canvasFrame(canvas);
  await page.mouse.move(1100, 400);
  await page.mouse.wheel(0, 280);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(200);
  await expect.poll(async () => Number(await loop.getAttribute("data-theatre-camera"))).toBeLessThan(.85);
  await expect.poll(() => page.locator(".v2-home").evaluate(node => Number((node as HTMLElement).style.getPropertyValue("--opening-progress")))).toBeGreaterThan(.2);
  await expect.poll(() => page.locator("#hero h1").evaluate(node => new DOMMatrixReadOnly(getComputedStyle(node).transform).m42)).toBeLessThan(-10);
  await expect.poll(() => canvasFrame(canvas)).not.toBe(before);
});

test("ambient control stops real canvas frames and resumes them from the keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const loop = page.locator("[data-global-context-loop]");
  const canvas = loop.locator("canvas");
  await expect(loop).toHaveAttribute("data-loop-phase", "ready");
  const pause = page.getByRole("button", { name: "Pause ambient motion" });
  await pause.focus();
  await expect(pause).toBeFocused();
  expect(await pause.evaluate(node => getComputedStyle(node).outlineStyle)).not.toBe("none");
  await page.keyboard.press("Enter");
  const resume = page.getByRole("button", { name: "Resume ambient motion" });
  await expect(resume).toHaveAttribute("aria-pressed", "true");
  await expect(resume).toBeFocused();
  await expect(loop).toHaveAttribute("data-loop-motion", "static");
  await expect(page.locator(".v2-home")).toHaveAttribute("data-theatre-motion", "static");
  expect(await consecutiveFrames(canvas)).toBe(1);
  // Pointer movement must not wake a renderer the visitor has paused.
  const still = await canvasFrame(canvas);
  await page.mouse.move(1100, 320);
  expect(await consecutiveFrames(canvas)).toBe(1);
  expect(await canvasFrame(canvas)).toBe(still);
  await page.keyboard.press("Space");
  await expect(page.getByRole("button", { name: "Pause ambient motion" })).toHaveAttribute("aria-pressed", "false");
  await expect(loop).toHaveAttribute("data-loop-motion", "running");
  await expect.poll(() => canvasFrame(canvas)).not.toBe(still);
  expect(await consecutiveFrames(canvas)).toBeGreaterThan(1);
});

test("reduced motion draws visible content while camera choreography stays static", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const loop = page.locator("[data-global-context-loop]");
  const canvas = loop.locator("canvas");
  await expect(loop).toHaveAttribute("data-loop-motion", "static");
  await expect(page.locator(".v2-home")).toHaveAttribute("data-theatre-motion", "static");
  await expect(page.locator("#hero h1")).toBeInViewport();
  await expect(page.locator("#hero img")).toHaveCount(0);
  await expect(page.locator(".v3-hero-actions").getByRole("link", { name: /^Resume/ })).toBeInViewport();
  await expect.poll(() => canvas.evaluate((node: HTMLCanvasElement) => {
    const pixels = node.getContext("2d")!.getImageData(0, 0, node.width, node.height).data;
    return pixels.some((value, index) => index % 4 === 3 && value > 0);
  })).toBe(true);
  expect(await consecutiveFrames(canvas)).toBe(1);
  await page.mouse.wheel(0, 250);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(200);
  await expect.poll(() => page.locator(".v2-home").evaluate(node => (node as HTMLElement).style.getPropertyValue("--opening-progress"))).toBe("0");
  expect(await page.locator("#hero h1").evaluate(node => getComputedStyle(node).transform)).toBe("none");
  expect(await consecutiveFrames(canvas)).toBe(1);
  await page.getByRole("button", { name: "Pause ambient motion" }).click();
  await page.getByRole("button", { name: "Resume ambient motion" }).click();
  await expect(loop).toHaveAttribute("data-loop-motion", "static");
  expect(await consecutiveFrames(canvas)).toBe(1);
});

test("theatre controls and recruitment paths remain visible in both languages and all target widths", async ({ page }) => {
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const control = page.getByRole("button", { name: "Pause ambient motion" });
    await expect(control).toBeInViewport();
    const bounds = await control.boundingBox();
    expect(bounds?.width).toBeGreaterThanOrEqual(44);
    expect(bounds?.height).toBeGreaterThanOrEqual(44);
    await expect(page.locator("#hero img")).toHaveCount(0);
    await page.getByRole("button", { name: "中文", exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    const chinesePause = page.getByRole("button", { name: "暂停环境动效" });
    await expect(chinesePause).toBeInViewport();
    await chinesePause.click();
    await expect(page.getByRole("button", { name: "恢复环境动效" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#hero h1")).toHaveText("kallist.");
    await expect(page.locator(".v3-hero-actions").getByRole("link", { name: /^简历/ })).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  }
});

test("mobile Chinese gallery next remains clickable at its right edge beside ambient pause", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "中文", exact: true }).click();
  const gallery = page.locator(".v21-gallery");
  const next = gallery.getByRole("button", { name: "下一幅作品", exact: true });
  const pause = page.getByRole("button", { name: "暂停环境动效", exact: true });
  // Reproduce the position in which the scrolling gallery controls share the
  // fixed motion control's bottom edge, rather than testing only their centers.
  await next.evaluate(node => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, scrollY + node.getBoundingClientRect().bottom - innerHeight + 10);
  });
  await expect(next).toBeInViewport();
  await expect(pause).toBeInViewport();
  const nextBounds = await next.boundingBox();
  const pauseBounds = await pause.boundingBox();
  if (!nextBounds || !pauseBounds) throw new Error("Gallery or ambient control has no bounds");
  const overlapWidth = Math.max(0, Math.min(nextBounds.x + nextBounds.width, pauseBounds.x + pauseBounds.width) - Math.max(nextBounds.x, pauseBounds.x));
  const overlapHeight = Math.max(0, Math.min(nextBounds.y + nextBounds.height, pauseBounds.y + pauseBounds.height) - Math.max(nextBounds.y, pauseBounds.y));
  expect(overlapWidth * overlapHeight).toBe(0);
  await expect(pause).toHaveAttribute("aria-pressed", "false");
  // All three edge positions belong to Next, including the formerly occluded
  // side; advancing artworks must never toggle the ambient motion state.
  for (const [index, fraction] of [.2, .5, .8].entries()) {
    // Playwright positions start at the padding box, one pixel inside the
    // measured border box, so subtract both that border and the edge inset.
    await next.click({ position: { x: nextBounds.width - 2, y: nextBounds.height * fraction } });
    await expect(gallery).toHaveAttribute("data-active-index", String(index + 2));
    await expect(pause).toHaveAttribute("aria-pressed", "false");
  }
  const artwork = await gallery.getAttribute("data-active-index");
  await pause.click();
  await expect(page.getByRole("button", { name: "恢复环境动效", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(gallery).toHaveAttribute("data-active-index", artwork!);
});
