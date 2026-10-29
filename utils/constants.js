const CONSTANTS = {
  PRODUCTS: {
    SAUCE_LABS_ONESIE: 'Sauce Labs Onesie',
    SAUCE_LABS_BACKPACK: 'Sauce Labs Backpack',
    SAUCE_LABS_BIKE_LIGHT: 'Sauce Labs Bike Light',
  },
  URLS: {
    INVENTORY: /.*inventory\.html/,
    CART: /.*cart\.html/,
    CHECKOUT_STEP_ONE: /.*checkout-step-one\.html/,
    CHECKOUT_STEP_TWO: /.*checkout-step-two\.html/,
    CHECKOUT_COMPLETE: /.*checkout-complete\.html/,
  },
  MESSAGES: {
    CHECKOUT_SUCCESS_HEADER: 'Thank you for your order!',
    CHECKOUT_SUCCESS_BODY:
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    LOGIN_LOCKED_OUT_ERROR:
      'Epic sadface: Sorry, this user has been locked out.',
    LOGIN_INVALID_ERROR:
      'Epic sadface: Username and password do not match any user in this service',
    LOGIN_USERNAME_REQUIRED: 'Epic sadface: Username is required',
    LOGIN_PASSWORD_REQUIRED: 'Epic sadface: Password is required',
    CHECKOUT_FIRST_NAME_REQUIRED: 'Error: First Name is required',
    CHECKOUT_LAST_NAME_REQUIRED: 'Error: Last Name is required',
    CHECKOUT_POSTAL_CODE_REQUIRED: 'Error: Postal Code is required',
  },
  PET_STATUS: {
    AVAILABLE: 'available',
    PENDING: 'pending',
    SOLD: 'sold',
    INVALID: 'invalid_status_xyz',
  },
  HTTP_STATUS: {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
  },
};

module.exports = CONSTANTS;

