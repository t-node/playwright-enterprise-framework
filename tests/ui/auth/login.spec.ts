import { expect, test } from "@playwright/test";
test.describe("Login Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("should login with valid credentials", async ({ page }) => {
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".title")).toHaveText("Products");
  });
  test("should show error for locked out user", async ({ page }) => {
    await page.getByPlaceholder("Username").fill("locked_out_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    const errorMessage = page.locator("[data-test='error']");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("locked out");
  });
  test("should show error for invalid credentials", async ({ page }) => {
    await page.getByPlaceholder("Username").fill("invalid_user");
    await page.getByPlaceholder("Password").fill("wrong_password");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert the generic error message
    const errorMessage = page.locator("[data-test='error']");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Username and password do not match",
    );
  });
  test("should show error when username is empty", async ({ page }) => {
    // Leave username empty, fill only password
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    const errorMessage = page.locator("[data-test='error']");
    await expect(errorMessage).toContainText("Username is required");
  });
  test("should show error when password is empty", async ({ page }) => {
    // Fill username, leave password empty
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByRole("button", { name: "Login" }).click();

    const errorMessage = page.locator("[data-test='error']");
    await expect(errorMessage).toContainText("Password is required");
  });
});
