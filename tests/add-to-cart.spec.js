import { test, expect } from '@playwright/test';

test('Add item to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('.cart_item .inventory_item_name')).toHaveText('Sauce Labs Backpack');
});


test('Remove item from cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('.cart_item')).toHaveCount(0);
});


test('Checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');

  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('.inventory_item_name'))
    .toHaveText('Sauce Labs Backpack');

  await expect(page.locator('.summary_subtotal_label'))
    .toHaveText('Item total: $29.99');

  await expect(page.locator('.cart_quantity'))
    .toHaveText('1');
});

test('Checkout for two items', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');

  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('.inventory_item_name').first())
    .toHaveText('Sauce Labs Backpack');

  await expect(page.locator('.inventory_item_name').last())
    .toHaveText('Sauce Labs Bike Light');

  await expect(page.locator('.summary_subtotal_label'))
    .toHaveText('Item total: $39.98');

  await expect(page.locator('.cart_quantity').first())
    .toHaveText('1');
  await expect(page.locator('.cart_quantity').last())
    .toHaveText('1');
});

test('Finish checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');

  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('.inventory_item_name'))
    .toHaveText('Sauce Labs Backpack');

  await expect(page.locator('.summary_subtotal_label'))
    .toHaveText('Item total: $29.99');

  await page.locator('[data-test="finish"]').click();

  await expect(page).toHaveURL('/checkout-complete.html');

  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');
});
