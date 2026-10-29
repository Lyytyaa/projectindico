const { test, expect } = require('../fixtures/baseTest');
const { buildPetPayload, generateUniquePetId } = require('../utils/testData');
const CONSTANTS = require('../utils/constants');

test.describe.serial('Task 2 - Petstore Swagger API Automation Tests', () => {
  let createdPetPayload;

  test.beforeAll(() => {
    createdPetPayload = buildPetPayload({
      status: CONSTANTS.PET_STATUS.AVAILABLE,
    });
  });

  // =========================================================================
  // 1. POST /pet - Add a new pet
  // =========================================================================
  test('TC-API-01: POST /pet - Should successfully add a new pet with valid payload (available)', async ({
    petstoreApi,
  }) => {
    const response = await petstoreApi.addPet(createdPetPayload);
    expect(response.status()).toBe(CONSTANTS.HTTP_STATUS.OK);

    const body = await response.json();
    expect(body.id).toBe(createdPetPayload.id);
    expect(body.name).toBe(createdPetPayload.name);
    expect(body.status).toBe(CONSTANTS.PET_STATUS.AVAILABLE);
    expect(body.category).toEqual(createdPetPayload.category);
    expect(body.photoUrls).toEqual(createdPetPayload.photoUrls);
    expect(body.tags).toEqual(createdPetPayload.tags);
  });

  test('TC-API-02: POST /pet - Should successfully add a new pet with status "pending"', async ({
    petstoreApi,
  }) => {
    const pendingPet = buildPetPayload({
      status: CONSTANTS.PET_STATUS.PENDING,
    });
    const response = await petstoreApi.addPet(pendingPet);
    expect(response.status()).toBe(CONSTANTS.HTTP_STATUS.OK);

    const body = await response.json();
    expect(body.id).toBe(pendingPet.id);
    expect(body.name).toBe(pendingPet.name);
    expect(body.status).toBe(CONSTANTS.PET_STATUS.PENDING);

    // Cleanup
    await petstoreApi.deletePet(pendingPet.id);
  });

  // =========================================================================
  // 2. GET /pet/findByStatus - Find pets by status
  // =========================================================================
  test('TC-API-03: GET /pet/findByStatus - Should return pets with status "available"', async ({
    petstoreApi,
  }) => {
    const response = await petstoreApi.findPetsByStatus(
      CONSTANTS.PET_STATUS.AVAILABLE
    );
    expect(response.status()).toBe(CONSTANTS.HTTP_STATUS.OK);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);

    // Verify all sampled items have status === 'available'
    const sample = body.slice(0, 20);
    for (const pet of sample) {
      expect(pet.status).toBe(CONSTANTS.PET_STATUS.AVAILABLE);
    }

    // Verify our newly created pet is present in the available list
    const foundCreatedPet = body.find((p) => p.id === createdPetPayload.id);
    expect(foundCreatedPet).toBeDefined();
    expect(foundCreatedPet.name).toBe(createdPetPayload.name);
  });

  test('TC-API-04: GET /pet/findByStatus - Should return pets with status "pending"', async ({
    petstoreApi,
  }) => {
    const response = await petstoreApi.findPetsByStatus(
      CONSTANTS.PET_STATUS.PENDING
    );
    expect(response.status()).toBe(CONSTANTS.HTTP_STATUS.OK);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    for (const pet of body.slice(0, 20)) {
      expect(pet.status).toBe(CONSTANTS.PET_STATUS.PENDING);
    }
  });

  test('TC-API-05: GET /pet/findByStatus - Should return pets with status "sold"', async ({
    petstoreApi,
  }) => {
    const response = await petstoreApi.findPetsByStatus(
      CONSTANTS.PET_STATUS.SOLD
    );
    expect(response.status()).toBe(CONSTANTS.HTTP_STATUS.OK);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    for (const pet of body.slice(0, 20)) {
      expect(pet.status).toBe(CONSTANTS.PET_STATUS.SOLD);
    }
  });

  // =========================================================================
  // 3. DELETE /pet/{petId} - Delete a pet by ID
  // =========================================================================
  test('TC-API-06: DELETE /pet/{petId} - Should delete the created pet by ID and confirm deletion', async ({
    petstoreApi,
  }) => {
    const deleteResponse = await petstoreApi.deletePet(createdPetPayload.id);
    expect(deleteResponse.status()).toBe(CONSTANTS.HTTP_STATUS.OK);

    const deleteBody = await deleteResponse.json();
    expect(deleteBody.code).toBe(200);
    expect(deleteBody.message).toBe(String(createdPetPayload.id));

    // Confirm pet no longer exists via GET /pet/{petId}
    const getResponse = await petstoreApi.getPetById(createdPetPayload.id);
    expect(getResponse.status()).toBe(CONSTANTS.HTTP_STATUS.NOT_FOUND);
  });

  test('TC-API-07: DELETE /pet/{petId} - Should return 404 Not Found when deleting a non-existent petId', async ({
    petstoreApi,
  }) => {
    const nonExistentId = generateUniquePetId();
    const response = await petstoreApi.deletePet(nonExistentId);
    expect(response.status()).toBe(CONSTANTS.HTTP_STATUS.NOT_FOUND);
  });

  // =========================================================================
  // 4. Negative & API vs. Documentation Mismatch Verification Tests
  // =========================================================================
  test('TC-API-08 [BUG-01 Verification]: GET /pet/findByStatus with invalid status returns 200 [] instead of documented 400', async ({
    petstoreApi,
  }) => {
    // Swagger doc specifies 400 "Invalid status value", but actual endpoint returns 200 OK with empty array []
    const response = await petstoreApi.findPetsByStatus(
      CONSTANTS.PET_STATUS.INVALID
    );
    expect(response.status()).toBe(CONSTANTS.HTTP_STATUS.OK);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(0);
  });

  test('TC-API-09 [BUG-02 Verification]: POST /pet with missing required fields (name, photoUrls) returns 200 instead of 400/405', async ({
    petstoreApi,
  }) => {
    // Swagger doc specifies 'name' and 'photoUrls' are required (*), and 405 on invalid input,
    // but actual API accepts an empty object {} with 200 OK.
    const response = await petstoreApi.addPet({});
    expect(response.status()).toBe(CONSTANTS.HTTP_STATUS.OK);
    const body = await response.json();
    expect(body).toHaveProperty('id');

    // Cleanup auto-generated pet
    if (body.id) {
      await petstoreApi.deletePet(body.id);
    }
  });

  test('TC-API-10 [BUG-03 Verification]: DELETE /pet/{petId} with non-numeric ID returns 404 NumberFormatException instead of 400', async ({
    petstoreApi,
  }) => {
    // Swagger doc specifies 400 "Invalid ID supplied" for invalid ID format,
    // but actual API returns 404 with java.lang.NumberFormatException message.
    const response = await petstoreApi.deletePet('invalid_id_abc');
    expect(response.status()).toBe(CONSTANTS.HTTP_STATUS.NOT_FOUND);
    const body = await response.json();
    expect(body.message).toContain('NumberFormatException');
  });
});

