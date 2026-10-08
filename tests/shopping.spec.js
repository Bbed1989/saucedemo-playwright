import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';


test('Add item to cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('.cart_item .inventory_item_name')).toHaveText('Sauce Labs Backpack');
});


test('Remove item from cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  await inventoryPage.open();
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.goToCart();
  await cartPage.removeFromCart('sauce-labs-backpack');
  await expect(page.locator('.cart_item')).toHaveCount(0);
});


test('Checkout', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  await inventoryPage.open();
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.goToCart();

  await cartPage.checkout();

  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');

  await checkoutPage.continueCheckout();

  await expect(page.locator('.inventory_item_name'))
    .toHaveText('Sauce Labs Backpack');

  await expect(page.locator('.summary_subtotal_label'))
    .toHaveText('Item total: $29.99');

  await expect(page.locator('.cart_quantity'))
    .toHaveText('1');
});

test('Checkout for two items', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  await inventoryPage.open();

  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.addToCart('sauce-labs-bike-light');

  await inventoryPage.goToCart();
  await cartPage.checkout();

  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');

  await checkoutPage.continueCheckout();

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
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  await inventoryPage.open();

  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.goToCart();

  await cartPage.checkout();

  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');

  await checkoutPage.continueCheckout();

  await expect(page.locator('.inventory_item_name'))
    .toHaveText('Sauce Labs Backpack');

  await expect(page.locator('.summary_subtotal_label'))
    .toHaveText('Item total: $29.99');

  await checkoutPage.finishCheckout();

  await expect(page).toHaveURL('/checkout-complete.html');

  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');
});
