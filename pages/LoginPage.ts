import { Page, expect } from '@playwright/test';
import { USERS, PASSWORD, ENV } from '../utils/constant';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(ENV.DEV);
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: /login/i }).click();
  }

  async expectError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
