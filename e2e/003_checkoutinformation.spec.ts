import { expect } from '@playwright/test';
import { test } from 'tests/fixtures/auth.fixtures';
import { LoginPage } from 'tests/pages/LoginPage';
import { CheckoutPage } from 'tests/pages/CheckoutPage';
import { USERS,PASSWORD } from 'tests/utils/constant';
import { qase } from 'playwright-qase-reporter';


test(
  qase(14, 'first name, last name and zip code empty'),
  async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.STANDARD, PASSWORD);
    await expect(page.getByText('Products' )).toBeVisible();
    await page.getByRole('button', { name: /Add to cart/i }).first().click();
    await page.locator('#shopping_cart_container').click();
    await expect(page.getByText('Your Cart')).toBeVisible();
    await page.locator('#checkout').click();
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
    await page.locator('#first-name').fill('');
    await page.locator('#last-name').fill('');
    await page.locator('#postal-code').fill('');
    await page.locator('#continue').click();
    await expect(page.getByText('Error: First Name is required')).toBeVisible();
  
  }
);

test(
  qase(15, 'last name and zip code empty'),
  async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.STANDARD, PASSWORD);
    await expect(page.getByText('Products')).toBeVisible();
    await page.getByRole('button', { name: /Add to cart/i }).first().click();
    await page.locator('#shopping_cart_container').click();
    await expect(page.getByText('Your Cart')).toBeVisible();
    await page.locator('#checkout').click();
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
    await page.locator('#first-name').fill('Bahlil');
    await page.locator('#last-name').fill('');
    await page.locator('#postal-code').fill('');
    await page.locator('#continue').click();
    await expect(page.getByText('Error: Last Name is required')).toBeVisible();
  }
);

test(
  qase(16, 'zip code empty'),
  async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.STANDARD, PASSWORD);
    await expect(page.getByText('Products')).toBeVisible();
    await page.getByRole('button', { name: /Add to cart/i }).first().click();
    await page.locator('#shopping_cart_container').click();
    await expect(page.getByText('Your Cart')).toBeVisible();
    await page.locator('#checkout').click();
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
    await page.locator('#first-name').fill('Bahlil');
    await page.locator('#last-name').fill('Xinlie');
    await page.locator('#postal-code').fill('');
    await page.locator('#continue').click();
    await expect(page.getByText('Error: Postal Code is required')).toBeVisible();
  }
);


test(
  qase(17, 'submit Your Information'),
  async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.STANDARD, PASSWORD);
    await expect(page.getByText('Products')).toBeVisible();
    await page.getByRole('button', { name: /Add to cart/i }).first().click();
    await page.locator('#shopping_cart_container').click();
    await expect(page.getByText('Your Cart')).toBeVisible();
    await page.locator('#checkout').click();
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
    await page.locator('#first-name').fill('Bahlil');
    await page.locator('#last-name').fill('Xinlie');
    await page.locator('#postal-code').fill('14045');
    await page.locator('#continue').click();
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await expect(page.getByText('Payment Information:')).toBeVisible();
    await expect(page.getByText('Price Total')).toBeVisible();

    const checkout = new CheckoutPage(page);
    const subtotal = await checkout.getSubtotal();
    const tax = await checkout.getTax();
    const total = await checkout.getTotal();
    expect(subtotal).toBeGreaterThan(0);
    expect(tax).toBeGreaterThan(0);
    expect(total).toBeGreaterThan(0);
    console.log('Ini Subtotal dari UI:',subtotal);
    console.log('Ini Tax dari UI:',tax);
    console.log('Ini Total dari UI:',total);
    await expect(page).toHaveTitle(/Swag Labs/);
  }
);

test(
  qase(18, 'submit final checkout'),
  async ({ page }) => {
    const login = new LoginPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login(USERS.STANDARD, PASSWORD);
    await expect(page.getByText('Products')).toBeVisible();
    await page.getByRole('button', { name: /Add to cart/i }).first().click();
    await page.locator('#shopping_cart_container').click();
    await expect(page.getByText('Your Cart')).toBeVisible();
    await page.locator('#checkout').click();
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
    await page.locator('#first-name').fill('Bahlil');
    await page.locator('#last-name').fill('Xinlie');
    await page.locator('#postal-code').fill('14045');
    await page.locator('#continue').click();
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await expect(page.getByText('Payment Information:')).toBeVisible();
    await expect(page.getByText('Price Total')).toBeVisible();

    
    const subtotal = await checkout.getSubtotal();
    const tax = await checkout.getTax();
    const total = await checkout.getTotal();
    expect(subtotal).toBeGreaterThan(0);
    expect(tax).toBeGreaterThan(0);
    expect(total).toBeGreaterThan(0);
    console.log('Ini Subtotal dari UI:',subtotal);
    console.log('Ini Tax dari UI:',tax);
    console.log('Ini Total dari UI:',total);
    await expect(page).toHaveTitle(/Swag Labs/);

    await checkout.submitFinalCheckout();
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
    await expect(page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();

  }
);
