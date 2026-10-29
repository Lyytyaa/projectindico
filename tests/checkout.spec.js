const { test, expect } = require('../fixtures/baseTest');
const { users } = require('../utils/testData');
const CONSTANTS = require('../utils/constants');
const { takeScreenshot } = require('../utils/helpers');

test.describe('Task 3 - SauceDemo E2E Checkout Flow', () => {
  test('TC-UI-06: Should complete E2E Checkout Flow for Sauce Labs Onesie', async ({
    authenticatedPage,
    homePage,
    checkoutPage,
  }) => {
    const productName = CONSTANTS.PRODUCTS.SAUCE_LABS_ONESIE;
    const customer = users.checkoutCustomer;

    await test.step("1. Add item 'Sauce Labs Onesie' to Cart", async () => {
      await homePage.addProductToCart(productName);
      await homePage.verifyCartBadgeCount(1);
      await takeScreenshot(authenticatedPage, 'TC-UI-06_Step1_Added_To_Cart');
    });

    await test.step('2. Go to Cart and verify item', async () => {
      await homePage.goToCart();
      await checkoutPage.verifyItemInCart(productName);
      await takeScreenshot(authenticatedPage, 'TC-UI-06_Step2_Cart_Page');
    });

    await test.step('3. Proceed Checkout and fill customer information', async () => {
      await checkoutPage.proceedToCheckout();
      await checkoutPage.fillCustomerInformation(
        customer.firstName,
        customer.lastName,
        customer.postalCode
      );
      await checkoutPage.verifyCheckoutOverview(productName);
      await takeScreenshot(authenticatedPage, 'TC-UI-06_Step3_Checkout_Overview');
    });

    await test.step('4. Finish Checkout and ensure Checkout process is completed', async () => {
      await checkoutPage.finishCheckout();
      await checkoutPage.verifyOrderCompleted();
      await takeScreenshot(authenticatedPage, 'TC-UI-06_Step4_Checkout_Complete');
    });
  });

  test('TC-UI-07: Should show validation error when First Name is empty during checkout', async ({
    authenticatedPage,
    homePage,
    checkoutPage,
  }) => {
    const customer = users.checkoutCustomer;
    await homePage.addProductToCart(CONSTANTS.PRODUCTS.SAUCE_LABS_ONESIE);
    await homePage.goToCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillCustomerInformation(
      '',
      customer.lastName,
      customer.postalCode
    );
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText(
      CONSTANTS.MESSAGES.CHECKOUT_FIRST_NAME_REQUIRED
    );
  });

  test('TC-UI-08: Should show validation error when Last Name is empty during checkout', async ({
    authenticatedPage,
    homePage,
    checkoutPage,
  }) => {
    const customer = users.checkoutCustomer;
    await homePage.addProductToCart(CONSTANTS.PRODUCTS.SAUCE_LABS_ONESIE);
    await homePage.goToCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillCustomerInformation(
      customer.firstName,
      '',
      customer.postalCode
    );
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText(
      CONSTANTS.MESSAGES.CHECKOUT_LAST_NAME_REQUIRED
    );
  });

  test('TC-UI-09: Should show validation error when Postal Code is empty during checkout', async ({
    authenticatedPage,
    homePage,
    checkoutPage,
  }) => {
    const customer = users.checkoutCustomer;
    await homePage.addProductToCart(CONSTANTS.PRODUCTS.SAUCE_LABS_ONESIE);
    await homePage.goToCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillCustomerInformation(
      customer.firstName,
      customer.lastName,
      ''
    );
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText(
      CONSTANTS.MESSAGES.CHECKOUT_POSTAL_CODE_REQUIRED
    );
  });
});

