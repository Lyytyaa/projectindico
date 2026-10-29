const { test, expect } = require('../fixtures/baseTest');
const { users } = require('../utils/testData');
const CONSTANTS = require('../utils/constants');
const { takeScreenshot } = require('../utils/helpers');

test.describe('Task 3 - SauceDemo Login Scenarios', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('TC-UI-01: Should login successfully with valid standard_user credentials', async ({
    page,
    loginPage,
    homePage,
  }) => {
    await loginPage.login(users.validUser.username, users.validUser.password);
    await homePage.verifyOnHomePage();
    await takeScreenshot(page, 'TC-UI-01_Login_Success');
  });

  test('TC-UI-02: Should display error message when logging in with locked_out_user', async ({
    loginPage,
  }) => {
    await loginPage.login(
      users.lockedOutUser.username,
      users.lockedOutUser.password
    );
    await loginPage.verifyErrorMessage(
      CONSTANTS.MESSAGES.LOGIN_LOCKED_OUT_ERROR
    );
  });

  test('TC-UI-03: Should display error message with invalid username and password', async ({
    loginPage,
  }) => {
    await loginPage.login(
      users.invalidUser.username,
      users.invalidUser.password
    );
    await loginPage.verifyErrorMessage(CONSTANTS.MESSAGES.LOGIN_INVALID_ERROR);
  });

  test('TC-UI-04: Should display validation error when username is empty', async ({
    loginPage,
  }) => {
    await loginPage.login('', users.validUser.password);
    await loginPage.verifyErrorMessage(
      CONSTANTS.MESSAGES.LOGIN_USERNAME_REQUIRED
    );
  });

  test('TC-UI-05: Should display validation error when password is empty', async ({
    loginPage,
  }) => {
    await loginPage.login(users.validUser.username, '');
    await loginPage.verifyErrorMessage(
      CONSTANTS.MESSAGES.LOGIN_PASSWORD_REQUIRED
    );
  });
});

