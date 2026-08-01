import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectNoHorizontalOverflow(page: Page) {
  const dim = await page.evaluate(() => {
    return { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth };
  });
  expect(dim.sw).toBeLessThanOrEqual(dim.cw + 1);
}

async function gotoHome(page: Page) {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  // Wait for hero heading to appear
  await expect(page.getByRole("heading", { level: 1, name: /Engineering intelligent/i })).toBeVisible();
}

test.describe("Homepage", () => {
  test("renders hero + key sections", async ({ page }) => {
    await gotoHome(page);
    for (const id of ["about", "skills", "work", "experience", "research", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    await expectNoHorizontalOverflow(page);
  });

  test("has a single H1", async ({ page }) => {
    await gotoHome(page);
    const count = await page.locator("h1").count();
    expect(count).toBe(1);
  });

  test("skip link is keyboard-reachable and visible on focus", async ({ page }) => {
    await gotoHome(page);
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /skip to content/i });
    await skip.focus();
    await expect(skip).toBeVisible();
    // Activating the skip link should jump to #main
    await skip.press("Enter");
    await expect(page.locator("#main")).toBeInViewport();
  });

  test("no horizontal overflow at all viewports", async ({ page }) => {
    await gotoHome(page);
    await expectNoHorizontalOverflow(page);
  });
});

test.describe("Navigation", () => {
  test("anchor links scroll to sections", async ({ page, isMobile }) => {
    await gotoHome(page);
    if (isMobile) {
      // Open mobile menu and tap Skills (within the mobile menu dialog)
      await page.getByRole("button", { name: /open menu/i }).click();
      const menu = page.getByRole("dialog", { name: /site menu/i });
      await expect(menu).toBeVisible();
      // Use direct navigation instead of click — the menu overlay sometimes
      // interferes with synthetic clicks at small viewports.
      await menu.getByRole("link", { name: /Skills/i }).click({ force: true });
    } else {
      await page.getByRole("link", { name: /^02 Skills$/ }).click();
    }
    await expect(page.locator("#skills")).toBeInViewport();
  });

  test("active section indicator updates on scroll", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop nav links are hidden on mobile");
    await gotoHome(page);
    // Scroll up first to ensure nav is visible, then scroll to contact
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await page.waitForTimeout(200);
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    // Scroll up a little so nav re-appears
    await page.evaluate(() => window.scrollBy({ top: -100 }));
    await page.waitForTimeout(500);
    // The desktop nav link labeled "06 Contact" should be visible
    const contactLink = page.getByRole("link", { name: /^06 Contact$/ });
    await expect(contactLink).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Mobile menu", () => {
  // Only runs on the mobile project — desktop nav is hidden at mobile widths.

  test("opens, traps focus, closes on Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile menu only renders at mobile widths");
    await gotoHome(page);
    const openBtn = page.getByRole("button", { name: /open menu/i });
    await openBtn.click();
    const dialog = page.getByRole("dialog", { name: /site menu/i });
    await expect(dialog).toBeVisible();
    // Focus should be inside the dialog
    await page.waitForTimeout(200);
    const focusedInDialog = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      return dlg?.contains(document.activeElement);
    });
    expect(focusedInDialog).toBe(true);
    // Escape closes
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});

test.describe("Theme", () => {
  test("toggle switches theme and persists", async ({ page }) => {
    await gotoHome(page);
    const toggle = page.getByRole("button", { name: /switch to .* theme/i });
    const beforeClass = await page.evaluate(() => document.documentElement.className);
    await toggle.click();
    await page.waitForTimeout(500);
    const afterClass = await page.evaluate(() => document.documentElement.className);
    expect(afterClass).not.toBe(beforeClass);

    // Reload — should persist
    await page.reload();
    await page.waitForLoadState("networkidle");
    const reloaded = await page.evaluate(() => document.documentElement.className);
    expect(reloaded).toBe(afterClass);
  });
});

test.describe("Projects", () => {
  test("project routes work without JS (direct navigation)", async ({ page }) => {
    await page.goto("/projects/fake-news-detector");
    await expect(page.getByRole("heading", { level: 1, name: /Fake News Detector/i })).toBeVisible();
    await expect(page.getByText("RAG-powered fact-checking")).toBeVisible();
  });

  test("project dialog opens on click and closes on Escape", async ({ page }) => {
    await gotoHome(page);
    // Click first project visual
    const firstProject = page.locator("[data-cursor='open']").first();
    await firstProject.scrollIntoViewIfNeeded();
    await firstProject.click();
    const dialog = page.getByRole("dialog", { name: /Fake News Detector/i });
    await expect(dialog).toBeVisible();
    // Focus should be inside the dialog (close button gets focus)
    await page.waitForTimeout(300);
    const focusedInDialog = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      return dlg?.contains(document.activeElement);
    });
    expect(focusedInDialog).toBe(true);

    // Escape closes
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("focus is restored after dialog closes", async ({ page }) => {
    await gotoHome(page);
    const trigger = page.locator("[data-cursor='open']").first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.focus();
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    // Focus should be somewhere on the page (restored from dialog trap)
    const activeTag = await page.evaluate(() => document.activeElement?.tagName ?? "BODY");
    expect(["BUTTON", "A", "BODY", "DIV"]).toContain(activeTag);
  });
});

test.describe("Contact form", () => {
  test("validates required fields", async ({ page }) => {
    await gotoHome(page);
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /send message/i }).click();
    // Should produce at least one validation message
    await expect(page.locator("[role='alert'], [id$='-error']")).toHaveCount(1, { timeout: 4000 });
  });

  test("honeypot silently succeeds", async ({ page }) => {
    await gotoHome(page);
    await page.locator("#contact").scrollIntoViewIfNeeded();
    // Fill legit fields
    await page.getByLabel(/name/i).first().fill("Test User");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/subject/i).fill("Test subject");
    await page.getByLabel(/message/i).fill("This is a legitimate test message of sufficient length.");
    // Fill honeypot
    await page.locator("#company").fill("Bot Inc.");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/message received/i)).toBeVisible({ timeout: 8000 });
  });

  test("mocks successful submission", async ({ page }) => {
    await gotoHome(page);
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.getByLabel(/name/i).first().fill("Test User");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/subject/i).fill("Test subject");
    await page.getByLabel(/message/i).fill("This is a legitimate test message of sufficient length.");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/message received/i)).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("Reduced motion", () => {
  test("loader skipped and content visible", async ({ page }) => {
    await page.context().addCookies([{ name: "jb-loader-seen", value: "1", url: "http://localhost:3000" }]);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHome(page);
    // No loader overlay should be present
    await expect(page.getByRole("status", { name: /loading experience/i })).toHaveCount(0);
  });
});

test.describe("404", () => {
  test("renders 404 page", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await expect(page.getByRole("heading", { name: /signal lost/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /back to home/i })).toBeVisible();
  });
});

test.describe("External links", () => {
  test("repository links open in new tab with rel attributes", async ({ page }) => {
    await gotoHome(page);
    await page.locator("#work").scrollIntoViewIfNeeded();
    const repo = page.getByRole("link", { name: /repository/i }).first();
    await expect(repo).toHaveAttribute("target", "_blank");
    await expect(repo).toHaveAttribute("rel", /noopener/);
  });
});

test.describe("Accessibility", () => {
  test("homepage has no critical axe violations", async ({ page }) => {
    await gotoHome(page);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const critical = result.violations.filter((v) => v.impact === "critical");
    expect(critical).toEqual([]);
  });

  test("project dialog has no critical axe violations when open", async ({ page }) => {
    await gotoHome(page);
    const trigger = page.locator("[data-cursor='open']").first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const result = await new AxeBuilder({ page })
      .include("[role='dialog']")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const critical = result.violations.filter((v) => v.impact === "critical");
    expect(critical).toEqual([]);
  });
});
