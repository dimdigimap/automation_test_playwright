import { expect } from '@playwright/test';
import { test } from 'tests/fixtures/auth.fixtures';
import { LoginPage } from 'tests/pages/LoginPage';
import { ProductsPage } from 'tests/pages/ProductPage';
import { USERS,PASSWORD } from 'tests/utils/constant';
import { qase } from 'playwright-qase-reporter';


test(
  qase(10, 'filter data product price from low to high'),
  async ({ authenticatedPage }) => {
    await expect(authenticatedPage.getByText('Products')).toBeVisible();
    const sorting = new ProductsPage (authenticatedPage)
    await sorting.sortBy('lohi');
    const actualPrices = await sorting.getPrices()
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);
    console.log('Actual Price :',actualPrices)
    console.log('Expected Price :',expectedPrices)
    expect(actualPrices).toEqual(expectedPrices);
  
  }
);


test(
  qase(11, 'filter data product price from high to low'),
  async ({ authenticatedPage }) => {
    await expect(authenticatedPage.getByText('Products')).toBeVisible();
    const sorting = new ProductsPage (authenticatedPage)
    await sorting.sortBy('hilo');
    const actualPrices = await sorting.getPrices()
    const expectedPrices = [...actualPrices].sort((a, b) => b - a);
    console.log('Actual Price :',actualPrices)
    console.log('Expected Price :',expectedPrices)
    expect(actualPrices).toEqual(expectedPrices);
  
  }
);


test(
  qase(12, 'filter data product price from a to z'),
  async ({ authenticatedPage }) => {
    await expect(authenticatedPage.getByText('Products')).toBeVisible();
    const sorting = new ProductsPage (authenticatedPage)
    await sorting.sortBy('az');
    const actualNames = await sorting.getNames();
    const expectedNames = [...actualNames].sort();
    console.log('Actual Name :',actualNames)
    console.log('Expected Name :',expectedNames)
    expect(actualNames).toEqual(expectedNames);
  
  }
);

test(
  qase(13, 'filter data product price from z to a'),
  async ({ authenticatedPage }) => {
    await expect(authenticatedPage.getByText('Products')).toBeVisible();
    const sorting = new ProductsPage (authenticatedPage)
    await sorting.sortBy('za');
    const actualNames = await sorting.getNames();
    const expectedNames = [...actualNames].sort().reverse();
    console.log('Actual Name :',actualNames)
    console.log('Expected Name :',expectedNames)
    expect(actualNames).toEqual(expectedNames);
  
  }
);