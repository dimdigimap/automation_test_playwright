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


import { expect } from '@playwright/test';
import { test } from 'tests/fixtures/auth.fixtures';
import { LoginPage } from 'tests/pages/LoginPage';
import { USERS,PASSWORD, PASSWORD_SQL,ENV } from 'tests/utils/constant';
import { qase } from 'playwright-qase-reporter';



test(
  qase(1, 'Login success with valid credential'),
  async ({ authenticatedPage }) => {
    await expect(authenticatedPage.getByText('Products')).toBeVisible();
  }
);

test(
  qase(2, 'Login failed when username is empty'),
  async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', PASSWORD);
    await login.expectError('Epic sadface: Username is required');
  }
);

test(
  qase(3, 'login failed whe password is null'),
  async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.STANDARD,'');
    await login.expectError('Epic sadface: Password is required');
  }
);


test(
  qase(4, 'valid username & password sql inject'),
  async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.STANDARD, PASSWORD_SQL);
    await login.expectError('Epic sadface: Username and password do not match any user in this service');
  }
);

test(
  qase(5, 'username locked user'),
  async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.LOCKED, PASSWORD);
    await login.expectError('Epic sadface: Sorry, this user has been locked out.');
  }
);

test(
  qase(6, 'problem user'),
  async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.PROBLEM, PASSWORD);
    await expect(page.getByText('Products' )).toBeVisible();
  }
);


test(
  qase(7, 'username performance glitch user'),
  async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.GLITCH, PASSWORD);
    await expect(page.getByText('Products' )).toBeVisible();
  }
);

test(
  qase(8, 'username error user'),
  async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.ERROR, PASSWORD);
    await expect(page.getByText('Products' )).toBeVisible();
  }
);

test(
  qase(9, 'username visual user'),
  async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.VISUAL, PASSWORD);
    await expect(page.getByText('Products' )).toBeVisible();
  }
);








