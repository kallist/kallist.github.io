import { test, expect } from "@playwright/test";

test("hero provides a recruitment path without waiting for the intro", async ({ page }) => {
  for (const width of [1440, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const hero = page.locator("#hero");
    await expect(hero.locator("h1")).toHaveText("kallist.");
    await expect(hero.getByText("AI application & Agent engineering", { exact: true })).toBeInViewport();
    await expect(hero.getByText(/South China Agricultural University · Class of 2027/)).toBeInViewport();
    await expect(hero.getByRole("link", { name: /^Resume/ })).toBeInViewport();
    await expect(hero.getByRole("link", { name: /^Contact/ })).toHaveAttribute("href", /^mailto:/);
    await expect(hero.getByRole("link", { name: /^Explore work/ })).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  }
});

test("work index links all five cases and pairs focus with the real preview", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const index = page.getByRole("navigation", { name: "Case study overview" });
  await expect(index.getByRole("link")).toHaveCount(5);
  await page.locator(".v3-work-index").evaluate(node => node.scrollIntoView({ behavior: "instant", block: "center" }));
  await expect(page.locator(".v3-work-index")).toHaveCSS("transform", "none");
  await expect(page.locator(".v3-work-index")).toHaveCSS("opacity", "1");
  await index.getByRole("link", { name: /CueParcel/ }).evaluate(node => node.focus({ preventScroll: true }));
  await expect(page.locator(".v3-work-preview img")).toHaveAttribute("src", "/projects/cueparcel-lens.png");
  await index.getByRole("link", { name: /RepoBound/ }).hover();
  await expect(page.locator(".v3-work-preview img")).toHaveAttribute("src", "/projects/repobound-hero.png");
  await index.getByRole("link", { name: /RepoBound/ }).click();
  await expect(page).toHaveURL(/\/work\/repobound\/$/);
});

test("films never request video bytes before an intentional play", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", request => { if (/\.mp4(?:\?|$)/.test(request.url())) requests.push(request.url()); });
  await page.goto("/");
  const room = page.locator("#films");
  await room.scrollIntoViewIfNeeded();
  await expect(room.getByRole("tab")).toHaveCount(3);
  await room.getByRole("tab", { name: /Qingming/ }).click();
  await expect(room).toContainText("not a controlled model benchmark");
  await room.getByRole("tab", { name: /Generative study/ }).click();
  await expect(room).toContainText("credits Gemini");
  await expect(room).toContainText("omits an unverified festival title");
  await expect(room.locator("video")).toHaveCount(0);
  expect(requests).toEqual([]);
});

test("all three actual files play and seek; choosing another work stops the old playback", async ({ page }) => {
  await page.goto("/");
  const room = page.locator("#films");
  for (const [name, seconds] of [["CueParcel", 201.734], ["Qingming", 188.934], ["Generative study", 48]] as const) {
    await room.getByRole("tab", { name: new RegExp(name) }).click();
    await room.getByRole("button", { name: /^Play / }).click();
    const video = room.locator("video");
    await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.readyState)).toBeGreaterThanOrEqual(2);
    expect(await video.evaluate((node: HTMLVideoElement, expected) => Math.abs(node.duration - expected), seconds)).toBeLessThan(.2);
    await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThan(0);
    await video.evaluate((node: HTMLVideoElement) => { node.currentTime = 15; });
    await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThanOrEqual(15);
    await expect(video).toHaveAttribute("controls", "");
    await expect(video).toBeFocused();
  }
  await room.getByRole("tab", { name: /CueParcel/ }).click();
  await expect(room.locator("video")).toHaveCount(0);
});

test("film selector works by keyboard and exposes recovery after a network failure", async ({ page }) => {
  await page.goto("/");
  const room = page.locator("#films");
  const first = room.getByRole("tab", { name: /CueParcel/ });
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(room.getByRole("tab", { name: /Qingming/ })).toBeFocused();
  await page.keyboard.press("End");
  await expect(room.getByRole("tab", { name: /Generative study/ })).toHaveAttribute("aria-selected", "true");
  await page.route("**/films/*.mp4", route => route.abort("failed"));
  await room.getByRole("button", { name: /^Play / }).click();
  await expect(room.getByRole("alert")).toBeVisible();
  await expect(room.getByRole("link", { name: "Open video file" })).toHaveAttribute("href", "/films/singularity-study.mp4");
  await page.unroute("**/films/*.mp4");
  await room.getByRole("button", { name: "Retry playback" }).click();
  await expect(room.getByRole("alert")).toHaveCount(0);
  await expect.poll(() => room.locator("video").evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThan(0);
  await expect(room.locator("video")).toBeFocused();
  await page.keyboard.press("Space");
  await expect.poll(() => room.locator("video").evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
});

test("a pending retry cannot place an old error over a newly selected film", async ({ page }) => {
  await page.goto("/");
  const room = page.locator("#films");
  let requests = 0;
  let retryRoute: import("@playwright/test").Route | undefined;
  await page.route("**/films/singularity-study.mp4", route => {
    requests += 1;
    if (requests === 1) return route.abort("failed");
    retryRoute = route;
  });
  await room.getByRole("tab", { name: /Generative study/ }).click();
  await room.getByRole("button", { name: /^Play / }).click();
  await expect(room.getByRole("alert")).toBeVisible();
  await room.getByRole("button", { name: "Retry playback" }).click();
  await expect.poll(() => Boolean(retryRoute)).toBe(true);
  await room.getByRole("tab", { name: /Qingming/ }).click();
  await retryRoute!.abort().catch(() => { /* The old media request may already be cancelled by unmount. */ });
  await page.unroute("**/films/singularity-study.mp4");
  await room.getByRole("button", { name: /^Play / }).click();
  await expect.poll(() => room.locator("video").evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThan(0);
  await expect(room.locator(".v3-film-stage")).toHaveAttribute("data-film", "qingming");
  await expect(room.getByRole("alert")).toHaveCount(0);
});

test("phone film controls, Chinese copy, reduced motion and media ranges work", async ({ page, request }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "中文", exact: true }).click();
  await expect(page.locator("#hero")).toContainText("2027届");
  const room = page.locator("#films");
  await room.scrollIntoViewIfNeeded();
  await expect(room.getByRole("heading", { name: /把系统，\s*拍成故事。/ })).toBeVisible();
  for (const tab of await room.getByRole("tab").all()) {
    expect((await tab.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  await room.getByRole("tab", { name: /清明雨上/ }).click();
  await expect(room).toContainText("不代表受控模型评测");
  await expect(room.locator("video")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  const range = await request.get("/films/singularity-study.mp4", { headers: { Range: "bytes=0-1023" } });
  expect(range.status()).toBe(206);
  expect(range.headers()["content-type"]).toBe("video/mp4");
  expect((await range.body()).length).toBe(1024);
  const invalid = await request.get("/films/singularity-study.mp4", { headers: { Range: "bytes=999999999999-" } });
  expect(invalid.status()).toBe(416);
});
