export class InventoryPage {

    constructor(page) {
        this.page = page;
    }
    async open() {
        await this.page.goto('/inventory.html');
    }
    async addToCart(itemName) {
        await this.page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
    }
    async goToCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
}