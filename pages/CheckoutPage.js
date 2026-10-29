const { expect } = require('@playwright/test');
const checkoutLocators = require('../locators/checkoutLocators');
const CONSTANTS = require('../utils/constants');

class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator(checkoutLocators.cartItem);
    this.cartItemNames = page.locator(checkoutLocators.cartItemName);
    this.checkoutButton = page.locator(checkoutLocators.checkoutButton);

    this.firstNameInput = page.locator(checkoutLocators.firstNameInput);
    this.lastNameInput = page.locator(checkoutLocators.lastNameInput);
    this.postalCodeInput = page.locator(checkoutLocators.postalCodeInput);
    this.continueButton = page.locator(checkoutLocators.continueButton);
    this.errorMessage = page.locator(checkoutLocators.errorMessage);

    this.summaryInfo = page.locator(checkoutLocators.summaryInfo);
    this.summaryTotal = page.locator(checkoutLocators.summaryTotal);
    this.finishButton = page.locator(checkoutLocators.finishButton);

    this.completeContainer = page.locator(checkoutLocators.completeContainer);
    this.completeHeader = page.locator(checkoutLocators.completeHeader);
    this.completeText = page.locator(checkoutLocators.completeText);
    this.backHomeButton = page.locator(checkoutLocators.backHomeButton);
  }

  async verifyItemInCart(productName) {
    await expect(this.page).toHaveURL(CONSTANTS.URLS.CART);
    const item = this.cartItems.filter({
      has: this.page.locator(checkoutLocators.cartItemName, {
        hasText: productName,
      }),
    });
    await expect(item).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(CONSTANTS.URLS.CHECKOUT_STEP_ONE);
  }

  async fillCustomerInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async verifyCheckoutOverview(productName) {
    await expect(this.page).toHaveURL(CONSTANTS.URLS.CHECKOUT_STEP_TWO);
    await expect(this.cartItemNames.filter({ hasText: productName })).toBeVisible();
    await expect(this.summaryInfo).toBeVisible();
    await expect(this.summaryTotal).toBeVisible();
  }

  async finishCheckout() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(CONSTANTS.URLS.CHECKOUT_COMPLETE);
  }

  async verifyOrderCompleted() {
    await expect(this.completeContainer).toBeVisible();
    await expect(this.completeHeader).toHaveText(
      CONSTANTS.MESSAGES.CHECKOUT_SUCCESS_HEADER
    );
    await expect(this.completeText).toHaveText(
      CONSTANTS.MESSAGES.CHECKOUT_SUCCESS_BODY
    );
    await expect(this.backHomeButton).toBeVisible();
  }
}

module.exports = CheckoutPage;

