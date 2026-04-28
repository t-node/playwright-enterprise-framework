/**
 * Inventory Page Tests — SauceDemo
 *
 * Tests the product listing page after login.
 * Demonstrates: navigation, counting elements, text assertions.
 *
 * Run: npx playwright test tests/ui/inventory/inventory.spec.ts
 */

import { expect, test } from "@playwright/test";

test.describe("Inventory Page", () => {
  // Login before each test (we'll replace this with storageState on Day 17)
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    // Wait until we're on the inventory page
    await expect(page).toHaveURL(/inventory/);
  });

  test("should display 6 products", async ({ page }) => {
    // Count the number of inventory items
    // Java: int count = driver.findElements(By.className("inventory_item")).size();
    //       assertEquals(count, 6);
    const products = page.locator(".inventory_item");
    await expect(products).toHaveCount(6);
  });

  test("should display product names and prices", async ({ page }) => {
    // Get the first product's name
    const firstProductName = page
      .locator(".inventory_item")
      .first()
      .locator(".inventory_item_name");
    await expect(firstProductName).toBeVisible();

    // Get the first product's price
    const firstProductPrice = page
      .locator(".inventory_item")
      .first()
      .locator(".inventory_item_price");
    await expect(firstProductPrice).toBeVisible();

    // Verify price format starts with $
    const priceText = await firstProductPrice.textContent();
    expect(priceText).toMatch(/^\$\d+\.\d{2}$/);
    // ^ Regular expression: starts with $, then digits.digits
  });

  test("should add a product to cart", async ({ page }) => {
    // Click "Add to cart" on the first product
    await page
      .locator(".inventory_item")
      .first()
      .getByRole("button", { name: "Add to cart" })
      .click();

    // Verify the cart badge shows "1"
    const cartBadge = page.locator(".shopping_cart_badge");
    await expect(cartBadge).toHaveText("1");

    // Verify the button changed to "Remove"
    await expect(
      page
        .locator(".inventory_item")
        .first()
        .getByRole("button", { name: "Remove" }),
    ).toBeVisible();
  });

  test("should navigate to product detail page", async ({ page }) => {
    // Click on the first product name to go to detail page
    const firstProductName = page.locator(".inventory_item_name").first();
    const productText = await firstProductName.textContent();
    await firstProductName.click();

    // Verify we're on the detail page
    await expect(page).toHaveURL(/inventory-item/);

    // Verify the product name matches
    await expect(page.locator(".inventory_details_name")).toHaveText(
      productText!,
    );

    // Verify "Back to products" link exists
    await expect(
      page.getByRole("button", { name: "Back to products" }),
    ).toBeVisible();
  });
});
