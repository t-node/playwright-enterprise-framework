import { expect, test } from "@playwright/test";

test.describe("SauceDemo Smoke Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the login page", async ({ page }) => {
    await expect(page).toHaveTitle("Swag Labs");
  });
  test("should display the login form", async ({ page }) => {
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });
  test("should have the correct URL", async ({ page }) => {
    await expect(page).toHaveURL("https://www.saucedemo.com");
  });
});
