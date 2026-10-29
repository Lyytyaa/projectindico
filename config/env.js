require('dotenv').config();

const ENV = {
  UI_BASE_URL: process.env.UI_BASE_URL || 'https://www.saucedemo.com',
  API_BASE_URL: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
  DEFAULT_TIMEOUT: Number(process.env.DEFAULT_TIMEOUT) || 30000,
  HEADLESS: process.env.HEADLESS !== 'false',
  API_KEY: process.env.API_KEY || 'special-key',
};

module.exports = ENV;

