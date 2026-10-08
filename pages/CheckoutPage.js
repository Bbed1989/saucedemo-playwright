export class CheckoutPage {
    
    constructor(page) {
        this.page = page;
    }

    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.page.locator('[data-test="firstName"]').fill(firstName);
        await this.page.locator('[data-test="lastName"]').fill(lastName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    }

    async continueCheckout() {
        await this.page.locator('[data-test="continue"]').click();
    }

    async finishCheckout() {
        await this.page.locator('[data-test="finish"]').click();
    }

}