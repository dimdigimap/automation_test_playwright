import { Page, expect, Locator } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  get sortDropdown(): Locator {
    return this.page.locator('[data-test="product-sort-container"]');
  }

  get productNames(): Locator {
    return this.page.locator('.inventory_item_name');
  }

  get productPrices(): Locator {
    return this.page.locator('.inventory_item_price');
  }

  async expectLoaded() {
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async addFirstItemToCart() {
    await this.page.getByRole('button', { name: /add to cart/i }).first().click();
  }

  async getNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

    async getPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();
    return prices.map(p => Number(p.replace('$', '')));
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
  await this.page
    .locator('[data-test="product-sort-container"]')
    .selectOption(value);
}

  async goToCart() {
    await this.page.locator('#shopping_cart_container').click();
  }
}
