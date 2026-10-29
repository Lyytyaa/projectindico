const checkoutLocators = {
  // Cart Page
  cartItem: '.cart_item',
  cartItemName: '.inventory_item_name',
  cartItemPrice: '.inventory_item_price',
  checkoutButton: '[data-test="checkout"]',
  continueShoppingButton: '[data-test="continue-shopping"]',

  // Checkout Step One (Your Information)
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  errorMessage: '[data-test="error"]',

  // Checkout Step Two (Overview)
  summaryInfo: '.summary_info',
  summarySubtotal: '.summary_subtotal_label',
  summaryTax: '.summary_tax_label',
  summaryTotal: '.summary_total_label',
  finishButton: '[data-test="finish"]',

  // Checkout Complete
  completeContainer: '#checkout_complete_container',
  completeHeader: '[data-test="complete-header"]',
  completeText: '[data-test="complete-text"]',
  backHomeButton: '[data-test="back-to-products"]',
};

module.exports = checkoutLocators;

