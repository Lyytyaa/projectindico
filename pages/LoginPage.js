const { expect } = require('@playwright/test');
const loginLocators = require('../locators/loginLocators');
const ENV = require('../config/env');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator(loginLocators.usernameInput);
    this.passwordInput = page.locator(loginLocators.passwordInput);
    this.loginButton = page.locator(loginLocators.loginButton);
    this.errorMessage = page.locator(loginLocators.errorMessage);
    this.loginLogo = page.locator(loginLocators.loginLogo);
  }

  async navigate() {
    await this.page.goto(ENV.UI_BASE_URL);
    await expect(this.loginLogo).toBeVisible();
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyErrorMessage(expectedText) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }
}

module.exports = LoginPage;

