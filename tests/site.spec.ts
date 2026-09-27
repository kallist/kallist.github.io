import { test, expect } from "@playwright/test";

test("homepage presents the real portrait and four ordered, reachable cases", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("kallist.");
  await expect(page.locator(".brand")).toHaveText("kallist");
  await expect(page.locator("main")).not.toContainText(/Wei Zhuojie|韦焯杰/);
  const portrait = page
    .getByRole("img", { name: /self portrait for kallist/i })
    .first();
  await expect(portrait).toBeVisible();
  expect(
    await portrait.evaluate(
      (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
    ),
  ).toBe(true);
  await expect(page.locator(".v2-work article h3")).toHaveText([
    /RepoBound/,
    /CueParcel/,
    /Agent Studio/,
    /Skin Lesion\s*AI Platform/,
  ]);
  await expect(
    page.getByRole("link", { name: /Explore case study/i }),
  ).toHaveCount(4);
  await expect(
    page.getByRole("heading", { name: /kallist/i, level: 2 }),
  ).toBeVisible();
});

test("education is Chinese-only and its campus gate is rendered as character art", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const education = page.locator("#education");
  await expect(education).toContainText("华南农业大学");
  await expect(education).toContainText("信息管理与信息系统");
  await expect(education).toContainText("本科");
  await expect(education).toContainText("2023.09 — 2027.06");
  await expect(education).not.toContainText(/South China Agricultural University|Information Management/);
  await expect(education.getByRole("img", { name: /数字与汉字描绘的华南农业大学校门/ })).toHaveAttribute("src", "/graphics/scau-gate.svg");
  const educationFontSize = await education.locator(".v2-education-copy > p").evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );
  expect(educationFontSize).toBeGreaterThanOrEqual(20);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("kallist.");
  const dimensions = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1);
});

test("persistent rails, transparent fields and chapter overlay work by pointer and keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".v2-rail")).toHaveCount(2);
  await expect(page.locator(".v2-pattern")).toHaveCount(9);
  await expect(page.locator('.v2-pattern[data-pattern="repobound"] .v2-pattern-row')).toHaveCount(30);
  const trigger = page.getByRole("button", { name: "Open chapter navigation" });
  await page.locator("#education").scrollIntoViewIfNeeded();
  await expect(trigger).toBeInViewport();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Chapters" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("navigation", { name: "Chapter navigation" }).getByRole("link")).toHaveCount(7);
  await expect(dialog.locator('a[href="#education"]')).toHaveAttribute("aria-current", "location");
  await dialog.locator('a[href="#work"]').hover();
  await expect.poll(async () => dialog.locator('a[href="#work"] b').evaluate((node) => getComputedStyle(node).transform)).not.toBe("none");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("work scenes use distinct evidence structures and a live reading rail", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".v2-repo-scene .v2-repo-media img")).toBeVisible();
  await expect(page.locator(".v2-cue-flow li")).toHaveCount(5);
  await expect(page.locator(".v2-agent-coordinates li")).toHaveCount(6);
  await expect(page.locator(".v2-skin-values > div")).toHaveCount(3);
  expect(await page.locator(".v2-cue-scene").evaluate((node) => getComputedStyle(node).backgroundColor)).toBe("rgb(41, 42, 38)");
  const metricSize = await page.locator(".v2-skin-values strong").first().evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
  expect(metricSize).toBeGreaterThan(60);
  const repoImage = await page.locator(".v2-repo-media img").boundingBox();
  expect(repoImage?.width).toBeGreaterThan(500);
  await page.locator(".v2-repo-scene").scrollIntoViewIfNeeded();
  await expect(page.locator(".v2-repo-scene")).toHaveClass(/v2-in-view/);
  const start = await page.locator(".v2-progress-readout").textContent();
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect.poll(async () => page.locator(".v2-progress-readout").textContent()).not.toBe(start);
  const fillHeight = await page.locator(".v2-progress-track i").evaluate((node) => Number.parseFloat((node as HTMLElement).style.height));
  expect(fillHeight).toBeGreaterThan(50);
});

test("pointer shifts character fields while reduced motion keeps them still", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/v2-motion-ready/);
  await page.mouse.move(1100, 300);
  await expect.poll(async () => page.locator("#hero").evaluate((node) => (node as HTMLElement).style.getPropertyValue("--pattern-x"))).not.toBe("");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.mouse.move(900, 360);
  await expect.poll(async () => page.locator("#hero").evaluate((node) => (node as HTMLElement).style.getPropertyValue("--pattern-x"))).toBe("");
});

test("body words and display text have hover feedback, and homepage images load", async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const word = page.locator(".v2-hero-statement .v2-word").first();
  await word.hover();
  await expect.poll(() => word.evaluate((node) => getComputedStyle(node).backgroundSize)).toBe("100% 100%");
  const headingWord = page.locator("#work-title .v2-word").first();
  await headingWord.scrollIntoViewIfNeeded();
  await expect(page.locator(".v2-section-intro")).toHaveClass(/v2-in-view/);
  await expect.poll(() => page.locator(".v2-section-intro").evaluate((node) => getComputedStyle(node).transform)).toBe("none");
  await headingWord.hover();
  await expect.poll(() => headingWord.evaluate((node) => getComputedStyle(node).backgroundSize)).toBe("100% 100%");
  for (const image of await page.locator(".v2-case-media img, .v2-hero-art img, .v2-education-art img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
  }
  const galleryWindow = page.locator(".v21-exhibition-window");
  await galleryWindow.scrollIntoViewIfNeeded();
  await galleryWindow.hover();
  for (const image of await page.locator(".v21-exhibition-item:not([aria-hidden]) img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0), { timeout: 10_000 }).toBe(true);
  }
});

test("desktop and tablet share the continuous exhibition with a dominant work and motion control", async ({
  page,
}) => {
  for (const width of [1440, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const gallery = page.locator(".v21-gallery");
    await expect(gallery).toHaveAttribute("data-gallery-count", "5");
    const images = gallery.locator(".v21-exhibition-item:not([aria-hidden]) img");
    await expect(images).toHaveCount(5);
    expect(new Set(await images.evaluateAll((nodes) => nodes.map((node) => (node as HTMLImageElement).src))).size).toBe(5);
    await expect(images.nth(4)).toHaveAttribute("src", /\/gallery\/riverside-ink\.webp$/);
    const riverside = gallery.locator(".v21-exhibition-item:not([aria-hidden])").nth(4);
    expect(await riverside.locator("img").evaluate((node) => getComputedStyle(node).objectFit)).toBe("contain");
    await expect(gallery.locator(".v21-exhibition-item")).toHaveCount(15);
    await expect(gallery.locator('.v21-exhibition-item[data-prominence="active"]')).toHaveCount(1);
    await expect(gallery.locator('.v21-exhibition-item[data-prominence="near"]')).toHaveCount(2);
    const hierarchy = await gallery.locator('.v21-exhibition-item[data-prominence="active"]').evaluate((active) => {
      const near = document.querySelector<HTMLElement>('.v21-exhibition-item[data-prominence="near"]')!;
      return { active: active.getBoundingClientRect().width, near: near.getBoundingClientRect().width };
    });
    expect(hierarchy.active).toBeGreaterThan(hierarchy.near * 1.4);
    const viewport = gallery.locator(".v21-exhibition-window");
    await viewport.scrollIntoViewIfNeeded();
    await viewport.hover();
    await page.waitForTimeout(650);
    const positions = await viewport.evaluate((window) => {
      const active = window.querySelector<HTMLElement>('.v21-exhibition-item[data-prominence="active"]')!;
      const near = Array.from(window.querySelectorAll<HTMLElement>('.v21-exhibition-item[data-prominence="near"]'));
      const center = window.getBoundingClientRect().left + window.clientWidth / 2;
      return { offset: Math.abs(active.getBoundingClientRect().left + active.getBoundingClientRect().width / 2 - center), leftVisible: near.some((item) => item.getBoundingClientRect().right > 30 && item.getBoundingClientRect().left < center), rightVisible: near.some((item) => item.getBoundingClientRect().left < innerWidth - 30 && item.getBoundingClientRect().right > center) };
    });
    expect(positions.offset).toBeLessThan(25);
    expect(positions.leftVisible).toBe(true);
    expect(positions.rightVisible).toBe(true);
    await page.mouse.move(10, 10);
    const movingFrom = await viewport.evaluate((node) => node.scrollLeft);
    await expect.poll(() => viewport.evaluate((node) => node.scrollLeft), { timeout: 2_000 }).toBeGreaterThan(movingFrom + 2);
    await expect(gallery.getByRole("button", { name: "Pause motion" })).toBeVisible();
    await gallery.getByRole("button", { name: "Pause motion" }).click();
    await expect(gallery).toHaveAttribute("data-paused", "true");
    const pausedAt = await viewport.evaluate((node) => node.scrollLeft);
    await page.waitForTimeout(300);
    expect(Math.abs((await viewport.evaluate((node) => node.scrollLeft)) - pausedAt)).toBeLessThan(2);
    await gallery.getByRole("button", { name: "Resume motion" }).click();
    await expect(gallery).toHaveAttribute("data-paused", "false");
    await viewport.hover();
    const before = await viewport.evaluate((node) => node.scrollLeft);
    const box = await viewport.boundingBox();
    if (!box) throw new Error("Gallery window has no bounds");
    await page.mouse.move(box.x + box.width * .7, box.y + box.height * .4);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * .3, box.y + box.height * .4, { steps: 5 });
    await page.mouse.up();
    expect(await viewport.evaluate((node) => node.scrollLeft)).toBeGreaterThan(before);
    await expect(gallery).not.toContainText(/Detail 01|Detail 02|same artwork/);
  }
});

test("desktop exhibition wraps between the last and first work without a visible end", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const gallery = page.locator(".v21-gallery");
  await gallery.locator(".v21-exhibition-window").scrollIntoViewIfNeeded();
  await gallery.getByRole("button", { name: "Previous artwork" }).click();
  await expect(gallery).toHaveAttribute("data-active-index", "5");
  await expect.poll(() => gallery.locator('.v21-exhibition-item[data-prominence="active"]').getAttribute("data-gallery-slot")).toBe("9");
  await gallery.getByRole("button", { name: "Next artwork" }).click();
  await expect(gallery).toHaveAttribute("data-active-index", "1");
  await expect.poll(() => gallery.locator('.v21-exhibition-item[data-prominence="active"]').getAttribute("data-gallery-slot")).toBe("5");
});

test("mobile shares the reel data and shows one snapped work with connected metadata", async ({ page }) => {
  for (const width of [360, 375, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const gallery = page.locator(".v21-gallery");
    const reel = gallery.locator(".v21-exhibition-window");
    await reel.scrollIntoViewIfNeeded();
    await expect(reel).toBeVisible();
    await expect(gallery.locator(".v21-gallery-track--echo")).toHaveCount(0);
    const works = gallery.locator(".v21-exhibition-item:not([aria-hidden])");
    await expect(works).toHaveCount(5);
    expect(new Set(await works.locator("img").evaluateAll((nodes) => nodes.map((node) => (node as HTMLImageElement).src))).size).toBe(5);
    await expect(gallery.locator(".v21-exhibition-item[aria-hidden='true']")).toHaveCount(10);
    await expect(gallery.locator(".v21-gallery-bottomline > span").first()).toHaveText("01 / 05");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    const metrics = await works.first().evaluate((node) => ({ width: node.getBoundingClientRect().width, viewport: innerWidth, fit: getComputedStyle(node.querySelector("img")!).objectFit }));
    expect(metrics.width).toBeGreaterThan((metrics.viewport - 60) * .77);
    expect(metrics.width).toBeLessThan((metrics.viewport - 60) * .84);
    expect(metrics.fit).toBe("contain");
    const composition = await reel.evaluate((window) => {
      const work = window.querySelector<HTMLElement>('.v21-exhibition-item[data-gallery-slot="5"]')!;
      const next = window.querySelector<HTMLElement>('.v21-exhibition-item[data-gallery-slot="6"]')!;
      const centered = Math.abs(work.getBoundingClientRect().left + work.clientWidth / 2 - innerWidth / 2);
      const peek = innerWidth - 30 - next.getBoundingClientRect().left;
      return { centered, peek, usable: innerWidth - 60 };
    });
    expect(composition.centered).toBeLessThanOrEqual(2);
    expect(composition.peek).toBeGreaterThanOrEqual(composition.usable * .09);
    expect(composition.peek).toBeLessThanOrEqual(composition.usable * .16);
    for (const image of await works.locator("img").all()) {
      const src = await image.getAttribute("src");
      expect((await page.request.get(new URL(src!, page.url()).href)).ok()).toBe(true);
    }
    await gallery.getByRole("button", { name: "Next artwork" }).click();
    await expect(gallery.locator(".v21-gallery-bottomline > span").first()).toHaveText("02 / 05");
    await reel.focus();
    await page.keyboard.press("ArrowRight");
    await expect(gallery.locator(".v21-gallery-bottomline > span").first()).toHaveText("03 / 05");
    await expect(works.nth(2)).toContainText("Two-panel character sequence");
    await expect(gallery.getByRole("button", { name: "Pause motion" })).toBeHidden();
  }
});

test("mobile reel wraps at both ends and remains manually swipable in reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const gallery = page.locator(".v21-gallery");
  const reel = gallery.locator(".v21-exhibition-window");
  await reel.scrollIntoViewIfNeeded();
  await gallery.getByRole("button", { name: "Previous artwork" }).click();
  await expect(gallery.locator(".v21-gallery-bottomline > span").first()).toHaveText("05 / 05");
  await gallery.getByRole("button", { name: "Next artwork" }).click();
  await expect(gallery.locator(".v21-gallery-bottomline > span").first()).toHaveText("01 / 05");
  await expect.poll(() => reel.evaluate((window) => {
    const middle = window.getBoundingClientRect().left + window.clientWidth / 2;
    const items = Array.from(window.querySelectorAll<HTMLElement>(".v21-exhibition-item"));
    const nearest = items.reduce((best, item) => Math.abs(item.getBoundingClientRect().left + item.clientWidth / 2 - middle) < Math.abs(best.getBoundingClientRect().left + best.clientWidth / 2 - middle) ? item : best, items[0]);
    return Number(nearest.dataset.gallerySlot);
  })).toBe(5);
  expect(await reel.evaluate((node) => getComputedStyle(node).scrollSnapType)).toContain("mandatory");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("touch gestures allow horizontal artwork changes and vertical page scrolling", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  try {
    await page.goto("/");
    const reel = page.locator(".v21-exhibition-window");
    await reel.scrollIntoViewIfNeeded();
    const box = await reel.boundingBox();
    if (!box) throw new Error("Mobile reel has no bounds");
    const client = await context.newCDPSession(page);
    async function touch(fromX: number, fromY: number, toX: number, toY: number) {
      await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: fromX, y: fromY, id: 1 }] });
      for (let step = 1; step <= 10; step++) {
        await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: fromX + (toX - fromX) * step / 10, y: fromY + (toY - fromY) * step / 10, id: 1 }] });
        await page.waitForTimeout(15);
      }
      await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    }
    const y = box.y + box.height * .5;
    await touch(box.x + box.width * .72, y, box.x + box.width * .28, y);
    await expect.poll(async () => Number(await page.locator(".v21-gallery").getAttribute("data-active-index"))).toBeGreaterThan(1);
    const verticalBefore = await page.evaluate(() => scrollY);
    await touch(box.x + box.width * .5, y + 90, box.x + box.width * .5, y - 90);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(verticalBefore);
    await touch(box.x + box.width * .68, y + 50, box.x + box.width * .32, y - 30);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  } finally {
    await context.close();
  }
});

test("ASCII context loop stays behind readable content and becomes static in reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const loop = page.locator("[data-global-context-loop]");
  await expect(loop).toHaveCount(1);
  await expect(loop.locator("canvas[data-living-ascii-loop]")).toHaveCount(1);
  await expect.poll(() => loop.getAttribute("data-glyph-count")).not.toBeNull();
  expect(Number(await loop.getAttribute("data-glyph-count"))).toBeGreaterThan(4000);
  await expect.poll(() => loop.locator("canvas").evaluate((node: HTMLCanvasElement) => {
    const context = node.getContext("2d")!;
    const pixels = context.getImageData(0, 0, node.width, node.height).data;
    for (let index = 3; index < pixels.length; index += 4) if (pixels[index] > 0) return true;
    return false;
  })).toBe(true);
  await expect(loop).toHaveAttribute("data-loop-phase", "ready", { timeout: 5000 });
  const livingCanvas = loop.locator("canvas");
  const motionFrame = await livingCanvas.evaluate((node: HTMLCanvasElement) => node.toDataURL());
  await page.waitForTimeout(600);
  expect(await livingCanvas.evaluate((node: HTMLCanvasElement) => node.toDataURL())).not.toBe(motionFrame);
  const continuingFrame = await livingCanvas.evaluate((node: HTMLCanvasElement) => node.toDataURL());
  await page.waitForTimeout(2100);
  expect(await livingCanvas.evaluate((node: HTMLCanvasElement) => node.toDataURL())).not.toBe(continuingFrame);
  expect(await loop.evaluate((node) => getComputedStyle(node).position)).toBe("fixed");
  expect(await loop.evaluate((node) => getComputedStyle(node).pointerEvents)).toBe("none");
  const portrait = page.locator(".v2-hero-art img");
  await expect.poll(() => portrait.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
  const portraitBox = await portrait.boundingBox();
  if (!portraitBox) throw new Error("Hero portrait has no bounds");
  const portraitInterior = { x: portraitBox.x + 2, y: portraitBox.y + 2, width: portraitBox.width - 4, height: portraitBox.height - 4 };
  const portraitWithLoop = await page.screenshot({ clip: portraitInterior, animations: "disabled" });
  await loop.evaluate((node: HTMLElement) => { node.style.visibility = "hidden"; });
  expect(portraitWithLoop.equals(await page.screenshot({ clip: portraitInterior, animations: "disabled" }))).toBe(true);
  await loop.evaluate((node: HTMLElement) => { node.style.visibility = "visible"; });
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: /Explore case study/i }).first()).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  await expect(loop).toHaveAttribute("data-loop-motion", "static");
  await expect(loop).toHaveAttribute("data-loop-phase", "ready");
  const staticFrame = await livingCanvas.evaluate((node: HTMLCanvasElement) => node.toDataURL());
  await page.waitForTimeout(150);
  expect(await livingCanvas.evaluate((node: HTMLCanvasElement) => node.toDataURL())).toBe(staticFrame);
  const exhibition = page.locator(".v21-exhibition-window");
  const galleryPosition = await exhibition.evaluate((node) => node.scrollLeft);
  await page.waitForTimeout(200);
  expect(await exhibition.evaluate((node) => node.scrollLeft)).toBe(galleryPosition);
  await expect(page.locator(".v21-exhibition-item:not([aria-hidden]) img")).toHaveCount(5);
  const projectImage = page.locator(".v2-repo-media img");
  await projectImage.scrollIntoViewIfNeeded();
  await expect.poll(() => projectImage.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
  await expect(page.locator(".v2-repo-media")).toHaveClass(/v2-in-view/);
  await expect.poll(() => page.locator(".v2-repo-media").evaluate((node) => getComputedStyle(node).clipPath)).toBe("inset(0px)");
  const box = await projectImage.boundingBox();
  if (!box) throw new Error("Project image has no bounds");
  // The translucent 1px border intentionally reveals its background; compare
  // the opaque image interior to catch glyphs painted across the screenshot.
  const interior = { x: box.x + 2, y: box.y + 2, width: box.width - 4, height: box.height - 4 };
  const withLoop = await page.screenshot({ clip: interior, animations: "disabled" });
  await loop.evaluate((node: HTMLElement) => { node.style.visibility = "hidden"; });
  expect(withLoop.equals(await page.screenshot({ clip: interior, animations: "disabled" }))).toBe(true);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(loop).toHaveAttribute("data-loop-motion", "running");
});

test("loop arrives before hero and remains fixed through the final chapter", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => {
    const timeline = { firstGlyph: 0, heroStart: 0 };
    (window as unknown as { __loopTimeline: typeof timeline }).__loopTimeline = timeline;
    const original = CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText = function (...args) {
      if (!timeline.firstGlyph && this.canvas.matches("[data-living-ascii-loop]")) timeline.firstGlyph = performance.now();
      return original.apply(this, args);
    };
    document.addEventListener("animationstart", (event) => {
      if (!timeline.heroStart && event.target instanceof Element && event.target.matches(".v2-hero .v2-frame")) timeline.heroStart = performance.now();
    });
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const loop = page.locator("[data-global-context-loop]");
  const hero = page.locator(".v2-hero .v2-frame");
  await expect(loop).toHaveAttribute("data-loop-phase", "ready", { timeout: 5000 });
  await expect(hero).toHaveCSS("opacity", "1");
  const timeline = await page.evaluate(() => (window as unknown as { __loopTimeline: { firstGlyph: number; heroStart: number } }).__loopTimeline);
  expect(timeline.firstGlyph).toBeGreaterThan(0);
  expect(timeline.heroStart).toBeGreaterThan(timeline.firstGlyph);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(loop).toBeInViewport();
  expect(await loop.evaluate((node) => getComputedStyle(node).position)).toBe("fixed");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("living loop changes to pale glyphs over dark chapters", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const loop = page.locator("[data-global-context-loop]");
  await expect(loop).toHaveAttribute("data-loop-motion", "static");
  const paleBefore = await loop.locator("canvas").evaluate((node: HTMLCanvasElement) => node.toDataURL());
  for (const selector of [".v2-cue-scene", "#education", "#contact"]) {
    await page.locator(selector).evaluate((element) => {
      const rect = element.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2);
    });
    await expect(loop).toHaveAttribute("data-loop-palette", "light");
    expect(await loop.locator("canvas").evaluate((node: HTMLCanvasElement) => node.toDataURL())).not.toBe(paleBefore);
    if (selector === ".v2-cue-scene") {
      await page.getByRole("button", { name: "Open chapter navigation" }).click();
      await page.evaluate(() => window.dispatchEvent(new Event("scroll")));
      await expect(loop).toHaveAttribute("data-loop-palette", "light");
      await page.keyboard.press("Escape");
    }
  }
});

test("loop canvas resizes with capped DPR and pauses on hidden visibility", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto("/");
  const loop = page.locator("[data-global-context-loop]");
  const canvas = loop.locator("canvas");
  await expect(loop).toHaveAttribute("data-loop-motion", "running");
  await expect.poll(() => canvas.evaluate((node: HTMLCanvasElement) => [node.width, node.height])).toEqual([2160, 1350]);
  const desktopCount = Number(await loop.getAttribute("data-glyph-count"));
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => canvas.evaluate((node: HTMLCanvasElement) => [node.width, node.height])).toEqual([488, 1055]);
  expect(Number(await loop.getAttribute("data-glyph-count"))).toBeLessThan(desktopCount);
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", { configurable: true, get: () => "hidden" });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(loop).toHaveAttribute("data-loop-motion", "paused");
  const pausedFrame = await canvas.evaluate((node: HTMLCanvasElement) => node.toDataURL());
  await page.waitForTimeout(180);
  expect(await canvas.evaluate((node: HTMLCanvasElement) => node.toDataURL())).toBe(pausedFrame);
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "visibilityState");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(loop).toHaveAttribute("data-loop-motion", "running");
  await context.close();
});

test("visible language switch translates key sections and chapter navigation", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const switcher = page.getByRole("group", { name: "Language / 语言" }).first();
    await expect(switcher).toBeInViewport();
    await expect(switcher.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
    await switcher.getByRole("button", { name: "中文" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("kallist.");
    await expect(page.locator("#work-title")).toContainText("精选项目");
    await expect(page.locator("#profile-title")).toContainText("构建它");
    await expect(page.locator("#visual-title")).toContainText("线条仍在");
    await expect(page.locator(".v21-gallery")).toContainText("彩色角色插画");
    const trigger = page.getByRole("button", { name: "打开章节导航" });
    await trigger.click();
    await expect(page.getByRole("dialog", { name: "章节" }).getByRole("link", { name: /视觉创作/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await page.locator("#hero").scrollIntoViewIfNeeded();
    const english = switcher.getByRole("button", { name: "EN" });
    await expect(english).toBeVisible();
    await english.focus();
    await expect(english).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("#work-title")).toContainText("Selected work");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test("case studies deep load with real evidence links and honest captions", async ({
  page,
}) => {
  for (const slug of [
    "repobound",
    "cueparcel",
    "agent-studio",
    "skin-lesion-ai",
  ]) {
    await page.goto(`/work/${slug}/`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Open repository/i }),
    ).toHaveAttribute("href", /^https:\/\/github\.com\/kallist\//);
    const leadImage = page.getByRole("img").first();
    await expect(leadImage).toBeVisible();
    expect(
      await leadImage.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    ).toBe(true);
    await expect(page.getByText(/Boundary\./)).toBeVisible();
  }
  await page.goto("/work/skin-lesion-ai/");
  await page.reload();
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByText("78.54%", { exact: true })).toBeVisible();
  await expect(page.getByText("65.49%", { exact: true })).toBeVisible();
  await expect(
    page.getByText(/not a clinical diagnosis product/i),
  ).toBeVisible();
});

test("phone-free resume prints and contact is a mailto", async ({ page }) => {
  await page.goto("/resume/");
  await expect(
    page.getByRole("heading", { name: /Wei Zhuojie/i }),
  ).toBeVisible();
  await page.evaluate(() => {
    (window as Window & { print: () => void }).print = () => {
      document.documentElement.dataset.printed = "yes";
    };
  });
  await page.getByRole("button", { name: /Print \/ Save as PDF/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-printed", "yes");
  await expect(
    page.getByRole("link", { name: "Download PDF" }),
  ).toHaveAttribute("href", "/resume/wei-zhuojie-resume-public.pdf");
  const pdfResponse = await page.request.get(
    "/resume/wei-zhuojie-resume-public.pdf",
  );
  expect(pdfResponse.ok()).toBe(true);
  expect(pdfResponse.headers()["content-type"]).toContain("application/pdf");
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: /2441397782@qq.com/i }),
  ).toHaveAttribute("href", "mailto:2441397782@qq.com");
});

test("mobile and tablet layouts stay within viewport, with touch navigation", async ({
  page,
}) => {
  for (const width of [375, 390, 430, 768]) {
    await page.setViewportSize({ width, height: 840 });
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    expect(
      dimensions.scroll,
      `horizontal overflow at ${width}px`,
    ).toBeLessThanOrEqual(dimensions.client + 1);
    await expect(
      page.getByRole("heading", { name: /Repo\s*Bound/, level: 3 }),
    ).toBeVisible();
    if (width <= 430) {
      const title = page.locator("#repobound-title");
      const edges = await title.evaluate((node) => ({
        title: node.getBoundingClientRect().right,
        lastWord: node.querySelector(".v2-word:last-child")?.getBoundingClientRect().right ?? Infinity,
      }));
      expect(edges.lastWord, `RepoBound title clipped at ${width}px`).toBeLessThanOrEqual(edges.title + 1);
    }
    await page.getByRole("button", { name: "Open chapter navigation" }).click();
    await expect(page.getByRole("navigation", { name: "Chapter navigation" }).getByRole("link", { name: /Resume/ })).toBeVisible();
    await page
      .getByRole("navigation", { name: "Chapter navigation" })
      .getByRole("link", { name: /Resume/ })
      .click();
    await expect(page).toHaveURL(/\/resume\/$/);
  }
});

test("mobile chapter navigation closes its overlay after selection", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Open chapter navigation" }).click();
  await page
    .getByRole("navigation", { name: "Chapter navigation" })
    .getByRole("link", { name: /Selected work/ })
    .click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole("dialog", { name: "Chapters" })).not.toBeVisible();
  await expect(page.locator("#work-title")).toBeVisible();
});

test("intermediate widths and landscape have no horizontal overflow", async ({
  page,
}) => {
  for (const [width, height] of [
    [844, 390],
    [1024, 768],
    [1280, 800],
    [1440, 900],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    expect(
      dimensions.scroll,
      `horizontal overflow at ${width}×${height}`,
    ).toBeLessThanOrEqual(dimensions.client + 1);
  }
});

test("reduced motion keeps content visible and disables smooth scrolling", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  expect(
    await page.locator(".v2-hero-art").evaluate((node) => getComputedStyle(node).transitionDuration),
  ).toBe("1e-05s");
});

test("desktop chapter navigation keeps work, method, art and resume reachable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open chapter navigation" });
  await trigger.click();
  const nav = page.getByRole("navigation", { name: "Chapter navigation" });
  await nav.getByRole("link", { name: "Method" }).click();
  await expect(page).toHaveURL(/#profile$/);
  await trigger.click();
  await nav.getByRole("link", { name: /Visual practice/ }).click();
  await expect(page).toHaveURL(/#visual$/);
  await trigger.click();
  await nav.getByRole("link", { name: /Selected work/ }).click();
  await expect(page).toHaveURL(/#work$/);
  await trigger.click();
  await nav.getByRole("link", { name: "Resume" }).click();
  await expect(page).toHaveURL(/\/resume\/$/);
  await expect(
    page.getByRole("heading", { name: /Wei Zhuojie/i }),
  ).toBeVisible();
});

test("keyboard skip link and case navigation work", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  await page
    .getByRole("link", { name: /Explore case study/i })
    .first()
    .focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/repobound\/$/);
});
