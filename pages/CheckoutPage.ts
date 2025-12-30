import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillInformation(first: string, last: string, zip: string) {
    await this.page.locator('#first-name').fill(first);
    await this.page.locator('#last-name').fill(last);
    await this.page.locator('#postal-code').fill(zip);
    await this.page.locator('#continue').click();
  }

  async expectError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async expectOverview() {
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
  }

   async getSubtotal(): Promise<number> {
    const text = await this.page
      .locator('[data-test="subtotal-label"]')
      .textContent();

    return Number(text?.replace(/[^0-9.]/g, ''));
}

   async getTax(): Promise<number> {
    const text = await this.page
      .locator('[data-test="tax-label"]')
      .textContent();

    return Number(text?.replace(/[^0-9.]/g, ''));
}

   async getTotal(): Promise<number> {
    const text = await this.page
      .locator('[data-test="total-label"]')
      .textContent();

    return Number(text?.replace(/[^0-9.]/g, ''));
}

 async submitFinalCheckout() {
   this.page.locator('[data-test="finish"]').click();
  }

}
