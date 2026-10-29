const path = require('path');
const fs = require('fs');
const ENV = require('../config/env');

/**
 * Capture and save a screenshot into the screenshots/ folder
 * @param {import('@playwright/test').Page} page
 * @param {string} screenshotName
 */
async function takeScreenshot(page, screenshotName) {
  const screenshotsDir = path.resolve(__dirname, '../screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  const sanitizedName = screenshotName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filePath = path.join(screenshotsDir, `${sanitizedName}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  return filePath;
}

/**
 * Helper class for Petstore v2 REST API operations
 */
class PetstoreApiHelper {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
    this.baseUrl = ENV.API_BASE_URL;
  }

  async addPet(payload, headers = {}) {
    return await this.request.post(`${this.baseUrl}/pet`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
    });
  }

  async findPetsByStatus(status) {
    const query =
      status !== undefined && status !== null
        ? `?status=${encodeURIComponent(status)}`
        : '';
    return await this.request.get(`${this.baseUrl}/pet/findByStatus${query}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  async getPetById(petId) {
    return await this.request.get(`${this.baseUrl}/pet/${petId}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  async deletePet(petId, apiKey = ENV.API_KEY) {
    return await this.request.delete(`${this.baseUrl}/pet/${petId}`, {
      headers: {
        Accept: 'application/json',
        api_key: apiKey,
      },
    });
  }
}

module.exports = {
  takeScreenshot,
  PetstoreApiHelper,
};

