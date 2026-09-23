import { test, expect } from "@playwright/test";

test("homepage presents the real portrait and four ordered, reachable cases", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Making AI",
  );
  const portrait = page
    .getByRole("img", { name: /self portrait by Wei Zhuojie/i })
    .first();
  await expect(portrait).toBeVisible();
  expect(
    await portrait.evaluate(
      (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
    ),
  ).toBe(true);
  await expect(page.locator(".project-feature h3")).toHaveText([
    "RepoBound",
    "CueParcel",
    "Agent Studio",
    "Skin Lesion AI Platform",
  ]);
  await expect(
    page.getByRole("link", { name: /Explore case study/i }),
  ).toHaveCount(4);
  await expect(
    page.getByRole("heading", { name: /something real/i }),
  ).toBeVisible();
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
  await expect(page.getByRole("link", { name: "Download PDF" })).toHaveAttribute(
    "href",
    "/resume/wei-zhuojie-resume-public.pdf",
  );
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
      page.getByText("RepoBound", { exact: true }).first(),
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
  await expect(
    page.getByRole("heading", { name: /Systems with receipts/i }),
  ).toBeVisible();
});

test("intermediate widths and landscape have no horizontal overflow", async ({
  page,
}) => {
  for (const [width, height] of [
    [844, 390],
    [1024, 768],
    [1280, 800],
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
      .locator(".hero-art img")
      .evaluate((node) => getComputedStyle(node).animationDuration),
  ).toBe("1e-05s");
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
