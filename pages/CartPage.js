export class CartPage {

   constructor(page) {
     this.page = page;
   }
   async open() {
     await this.page.goto('/cart.html');
   }  
   async removeFromCart(itemName) {
     await this.page.locator(`[data-test="remove-${itemName}"]`).click();
   }
   async checkout() {
     await this.page.locator('[data-test="checkout"]').click();
   }
   async continueShopping() {
     await this.page.locator('[data-test="continue-shopping"]').click();
   }
}