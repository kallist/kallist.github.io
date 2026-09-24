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
  await expect(page.locator(".v11-work article h3")).toHaveText([
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

test("education reads as homepage metadata and a profile annotation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const heroEducation = page.locator(".v11-hero-education");
  await expect(heroEducation).toContainText(
    "South China Agricultural University",
  );
  await expect(heroEducation).toContainText(
    "Information Management & Information Systems",
  );
  await expect(heroEducation).toContainText("2027");
  const educationFontSize = await heroEducation.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );
  expect(educationFontSize).toBeGreaterThanOrEqual(12);
  await expect(page.locator(".v11-education")).toContainText(
    "2023.09 — 2027.06",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("kallist.");
  const dimensions = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1);
});

test("chapter patterns respond to pointer, settle on leave and respect reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".v11-page-turn")).toHaveCount(5);
  await expect(page.locator(".v11-pattern")).toHaveCount(9);
  const pattern = page.locator('.v11-pattern[data-pattern="repobound"]');
  await pattern.scrollIntoViewIfNeeded();
  const first = pattern.locator("span").first();
  const box = await first.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await expect
    .poll(() => first.evaluate((node) => node.style.transform))
    .not.toBe("");
  await page.mouse.move(0, 0);
  await expect
    .poll(() => first.evaluate((node) => node.style.transform))
    .toBe("");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  expect(await first.evaluate((node) => node.style.transform)).toBe("");
});

test("one full artwork ends in compact, labelled details without repeating a large image", async ({
  page,
}) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const source = await page
      .locator(".v11-visual-full img")
      .getAttribute("src");
    await expect(page.locator(".v11-detail")).toHaveCount(2);
    for (const detail of await page.locator(".v11-detail").all()) {
      await expect(detail.locator("img")).toHaveAttribute("src", source!);
      await expect(detail.locator("figcaption")).toContainText("same artwork");
      const imageBox = await detail.locator(".v11-detail-image").boundingBox();
      const captionBox = await detail.locator("figcaption").boundingBox();
      expect(imageBox).not.toBeNull();
      expect(captionBox).not.toBeNull();
      expect(imageBox!.height).toBeLessThanOrEqual(150);
      expect(imageBox!.x + imageBox!.width).toBeLessThanOrEqual(
        captionBox!.x + 1,
      );
    }
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
      page.getByRole("heading", { name: /RepoBound/, level: 3 }),
    ).toBeVisible();
    await page.locator(".mobile-menu summary").click();
    await expect(
      page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "Resume" }),
    ).toBeVisible();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Resume" })
      .click();
    await expect(page).toHaveURL(/\/resume\/$/);
  }
});

test("mobile section navigation closes its menu after selection", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.locator(".mobile-menu summary").click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Work" })
    .click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator(".mobile-menu")).not.toHaveAttribute("open", "");
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
    await page
      .locator(".v11-hero-portrait")
      .evaluate((node) => getComputedStyle(node).animationDuration),
  ).toBe("1e-05s");
});

test("desktop chapter navigation keeps work, method, art and resume reachable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await nav.getByRole("link", { name: "Method" }).click();
  await expect(page).toHaveURL(/#profile$/);
  await nav.getByRole("link", { name: "Art" }).click();
  await expect(page).toHaveURL(/#visual$/);
  await nav.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/#work$/);
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
