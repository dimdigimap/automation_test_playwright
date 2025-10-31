/**
 * @fileoverview
 * Automated Playwright test suite for Basic e-commerce web application.
 * 
 * This suite covers the following test scenarios:
 * 
 * - login validation.
 * - product page.
 * - checkout page.
 * - about page.
 * 
 * Each test is integrated with Qase test management via the `qase` wrapper.
 * 
 * @remarks
 * - Uses Playwright's test runner and assertion library.
 * - Locators are based on roles, text, and custom attributes.
 * - Some tests use dynamic assertions based on DOM content.
 * - Includes debugging output via `console.log` for key data points.
 * - Some tests are commented out for reference or future use.
 * 
 * @see https://playwright.dev/
 * @see https://github.com/qase-tms/qase-javascript/tree/master/packages/qase-playwright
 */
//import * as dotenv from 'dotenv';
//dotenv.config(); // tambahkan ini baris pertama


import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { assert } from 'console';
import { qase } from 'playwright-qase-reporter';


test(qase(1, 'username & password true'), async ({ page }) => {
  const UrlDev = 'https://www.saucedemo.com/'
 
  await page.goto(UrlDev);
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByText('Products' )).toBeVisible();
});


test(qase(2, 'username null & password true'), async ({ page }) => {
  const UrlDev = 'https://www.saucedemo.com/'
 
  await page.goto(UrlDev);
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.getByPlaceholder('Username').fill('');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});

test(qase(3, 'username true & password null'), async ({ page }) => {
  const UrlDev = 'https://www.saucedemo.com/'
 
  await page.goto(UrlDev);
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
});

test(qase(4, 'username true & password sql inject'), async ({ page }) => {
  const UrlDev = 'https://www.saucedemo.com/'
 
  await page.goto(UrlDev);
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill(" 'or 1=1 --");
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test(qase(5, 'username locked user'), async ({ page }) => {
  const UrlDev = 'https://www.saucedemo.com/'
 
  await page.goto(UrlDev);
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.' )).toBeVisible();
});

test(qase(6, 'problem problem user'), async ({ page }) => {
  const UrlDev = 'https://www.saucedemo.com/'
 
  await page.goto(UrlDev);
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.getByPlaceholder('Username').fill('problem_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByText('Products' )).toBeVisible();
});

test(qase(7, 'username performance glitch user'), async ({ page }) => {
  const UrlDev = 'https://www.saucedemo.com/'
 
  await page.goto(UrlDev);
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.getByPlaceholder('Username').fill('performance_glitch_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByText('Products' )).toBeVisible();
});

test(qase(8, 'username error user'), async ({ page }) => {
  const UrlDev = 'https://www.saucedemo.com/'
 
  await page.goto(UrlDev);
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.getByPlaceholder('Username').fill('error_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByText('Products' )).toBeVisible();


});

test(qase(9, 'username visual user'), async ({ page }) => {
  const UrlDev = 'https://www.saucedemo.com/'
 
  await page.goto(UrlDev);
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.getByPlaceholder('Username').fill('visual_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByText('Products' )).toBeVisible();
});

test(qase(10, 'first name, last name and zip code null'), async ({ page }) => {
  const UrlDev = 'https://www.saucedemo.com/'
 
  await page.goto(UrlDev);
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByText('Products')).toBeVisible();
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
  

});



