const { expect } = require('@playwright/test');
const homeLocators = require('../locators/homeLocators');
const CONSTANTS = require('../utils/constants');

class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator(homeLocators.pageTitle);
    this.inventoryList = page.locator(homeLocators.inventoryList);
    this.inventoryItems = page.locator(homeLocators.inventoryItem);
    this.inventoryItemNames = page.locator(homeLocators.inventoryItemName);
    this.inventoryItemPrices = page.locator(homeLocators.inventoryItemPrice);
    this.sortDropdown = page.locator(homeLocators.sortDropdown);
    this.cartIcon = page.locator(homeLocators.cartIcon);
    this.cartBadge = page.locator(homeLocators.cartBadge);
    this.burgerMenuButton = page.locator(homeLocators.burgerMenuButton);
    this.logoutLink = page.locator(homeLocators.logoutLink);
  }

  async verifyOnHomePage() {
    await expect(this.page).toHaveURL(CONSTANTS.URLS.INVENTORY);
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
  }

  async addProductToCart(productName) {
    const productCard = this.inventoryItems.filter({
      has: this.page.locator(homeLocators.inventoryItemName, {
        hasText: productName,
      }),
    });
    await expect(productCard).toBeVisible();
    const addToCartBtn = productCard.locator('button');
    await expect(addToCartBtn).toHaveText('Add to cart');
    await addToCartBtn.click();
    await expect(addToCartBtn).toHaveText('Remove');
  }

  async verifyCartBadgeCount(count) {
    await expect(this.cartBadge).toBeVisible();
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async goToCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL(CONSTANTS.URLS.CART);
  }

  async sortProducts(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getAllProductNames() {
    return await this.inventoryItemNames.allInnerTexts();
  }

  async getAllProductPrices() {
    const priceTexts = await this.inventoryItemPrices.allInnerTexts();
    return priceTexts.map((text) => parseFloat(text.replace('$', '')));
  }

  async logout() {
    await this.burgerMenuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }
}

module.exports = HomePage;

