const base = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const CheckoutPage = require('../pages/CheckoutPage');
const { PetstoreApiHelper, takeScreenshot } = require('../utils/helpers');
const { users } = require('../utils/testData');

const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.navigate();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await homePage.verifyOnHomePage();
    await use(page);
  },

  petstoreApi: async ({ request }, use) => {
    const apiHelper = new PetstoreApiHelper(request);
    await use(apiHelper);
  },
});

// Automatically capture screenshot into screenshots/ directory if a UI test fails
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus && page) {
    try {
      const screenshotPath = await takeScreenshot(
        page,
        `FAIL_${testInfo.title}_${Date.now()}`
      );
      await testInfo.attach('failure-screenshot', {
        path: screenshotPath,
        contentType: 'image/png',
      });
    } catch {
      // Ignore screenshot error for API-only tests where page isn't navigated
    }
  }
});

const expect = base.expect;

module.exports = { test, expect };

