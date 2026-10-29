# Task 2 & Task 3 – Playwright Automation Test Report

> **Auto-Generated Report:** File ini di-generate secara otomatis setiap kali `npm test` / `npx playwright test` dijalankan.

**Framework:** Playwright (`@playwright/test`)  
**Execution Timestamp:** 2026-10-29 03:33:42 UTC  
**Overall Status:** PASSED  
**Total Duration:** 28.7s  

---

## 1. Execution Summary

| Suite Category | Total Executed | Passed | Failed | Skipped | Pass Rate |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Task 2 – Petstore API Automation** | 10 | 10 | 0 | 0 | **100%** |
| **Task 3 – SauceDemo UI Automation** | 10 | 10 | 0 | 0 | **100%** |
| **TOTAL** | **20** | **20** | **0** | **0** | **100.00%** |

---

## 2. Task 2 – API Automation Test Results (`https://petstore.swagger.io/v2`)

| Spec File | Test Case | Duration | Status | Error (If Any) |
| :--- | :--- | :---: | :---: | :--- |
| `petstore.api.spec.js` | TC-API-01: POST /pet - Should successfully add a new pet with valid payload (available) | 1.2s | **PASS** | - |
| `petstore.api.spec.js` | TC-API-02: POST /pet - Should successfully add a new pet with status "pending" | 1.3s | **PASS** | - |
| `petstore.api.spec.js` | TC-API-03: GET /pet/findByStatus - Should return pets with status "available" | 5.8s | **PASS** | - |
| `petstore.api.spec.js` | TC-API-04: GET /pet/findByStatus - Should return pets with status "pending" | 2.3s | **PASS** | - |
| `petstore.api.spec.js` | TC-API-05: GET /pet/findByStatus - Should return pets with status "sold" | 3.7s | **PASS** | - |
| `petstore.api.spec.js` | TC-API-06: DELETE /pet/{petId} - Should delete the created pet by ID and confirm deletion | 1.3s | **PASS** | - |
| `petstore.api.spec.js` | TC-API-07: DELETE /pet/{petId} - Should return 404 Not Found when deleting a non-existent petId | 1.0s | **PASS** | - |
| `petstore.api.spec.js` | TC-API-08 [BUG-01 Verification]: GET /pet/findByStatus with invalid status returns 200 [] instead of documented 400 | 1.0s | **PASS** | - |
| `petstore.api.spec.js` | TC-API-09 [BUG-02 Verification]: POST /pet with missing required fields (name, photoUrls) returns 200 instead of 400/405 | 1.3s | **PASS** | - |
| `petstore.api.spec.js` | TC-API-10 [BUG-03 Verification]: DELETE /pet/{petId} with non-numeric ID returns 404 NumberFormatException instead of 400 | 1.0s | **PASS** | - |

---

## 3. Task 3 – UI Automation Test Results (`https://www.saucedemo.com`)

| Spec File | Test Case | Duration | Status | Error (If Any) |
| :--- | :--- | :---: | :---: | :--- |
| `checkout.spec.js` | TC-UI-06: Should complete E2E Checkout Flow for Sauce Labs Onesie | 1.5s | **PASS** | - |
| `checkout.spec.js` | TC-UI-07: Should show validation error when First Name is empty during checkout | 0.8s | **PASS** | - |
| `checkout.spec.js` | TC-UI-08: Should show validation error when Last Name is empty during checkout | 0.9s | **PASS** | - |
| `checkout.spec.js` | TC-UI-09: Should show validation error when Postal Code is empty during checkout | 0.9s | **PASS** | - |
| `login.spec.js` | TC-UI-01: Should login successfully with valid standard_user credentials | 0.7s | **PASS** | - |
| `login.spec.js` | TC-UI-02: Should display error message when logging in with locked_out_user | 0.5s | **PASS** | - |
| `login.spec.js` | TC-UI-03: Should display error message with invalid username and password | 0.6s | **PASS** | - |
| `login.spec.js` | TC-UI-04: Should display validation error when username is empty | 0.5s | **PASS** | - |
| `login.spec.js` | TC-UI-05: Should display validation error when password is empty | 0.6s | **PASS** | - |
| `search.spec.js` | TC-UI-10: Should find Sauce Labs Onesie in product catalog and sort by Price (low to high) | 0.7s | **PASS** | - |

---

## 4. Artifacts & Interactive Report

- **Interactive HTML Report:** [`reports/html-report/index.html`](./html-report/index.html) (jalankan `npm run report`)
- **JSON Report:** [`reports/test-results.json`](./test-results.json)
- **Screenshots Folder:** [`screenshots/`](../screenshots/)
