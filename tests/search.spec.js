const { test, expect } = require('../fixtures/baseTest');
const CONSTANTS = require('../utils/constants');

test.describe('SauceDemo Product Catalog & Sort Verification', () => {
  test('TC-UI-10: Should find Sauce Labs Onesie in product catalog and sort by Price (low to high)', async ({
    authenticatedPage,
    homePage,
  }) => {
    const productNames = await homePage.getAllProductNames();
    expect(productNames).toContain(CONSTANTS.PRODUCTS.SAUCE_LABS_ONESIE);

    await homePage.sortProducts('lohi');
    const sortedNames = await homePage.getAllProductNames();
    const sortedPrices = await homePage.getAllProductPrices();

    // Sauce Labs Onesie ($7.99) is the lowest-priced item
    expect(sortedNames[0]).toBe(CONSTANTS.PRODUCTS.SAUCE_LABS_ONESIE);
    for (let i = 0; i < sortedPrices.length - 1; i++) {
      expect(sortedPrices[i]).toBeLessThanOrEqual(sortedPrices[i + 1]);
    }
  });
});

