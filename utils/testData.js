const users = require('../test-data/users.json');
const CONSTANTS = require('./constants');

function generateUniquePetId() {
  return Math.floor(100000000 + Math.random() * 900000000);
}

function buildPetPayload(overrides = {}) {
  const defaultId = generateUniquePetId();
  return {
    id: defaultId,
    category: {
      id: 1,
      name: 'Dogs',
    },
    name: `Buddy-${defaultId}`,
    photoUrls: ['https://example.com/photos/buddy.jpg'],
    tags: [
      {
        id: 101,
        name: 'vaccinated',
      },
    ],
    status: CONSTANTS.PET_STATUS.AVAILABLE,
    ...overrides,
  };
}

module.exports = {
  users,
  generateUniquePetId,
  buildPetPayload,
};

