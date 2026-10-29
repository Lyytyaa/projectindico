# QA Take Home Test – Playwright Automation Framework (API & UI)

Repository ini berisi solusi lengkap untuk **Take Home Test – Junior to Medior QA Engineer**, mencakup:
1. **Task 1 – Manual API Test** (`https://petstore.swagger.io/#/`)
2. **Task 2 – API Automation Test** (`POST /pet`, `GET /pet/findByStatus`, `DELETE /pet/{petId}`)
3. **Task 3 – UI Automation Test** (`https://www.saucedemo.com` – Login & E2E Checkout Flow `Sauce Labs Onesie`)
4. **Bug Documentation** (Dokumentasi temuan bug / mismatch antara dokumentasi Swagger dan response aktual API)

---

## Dokumentasi & Laporan (Quick Links)

- **[Task 1 – Manual API Test & Bug Report Documentation (Excel .xlsx)](./Task_1_docs/Task1_Manual_API_Test_and_Bug_Report.xlsx)**
- **[Task 2 & Task 3 – Automation Test Report (Markdown)](./reports/Automation_Test_Report.md)**
- **Interactive Playwright HTML Report:** `reports/html-report/index.html` (jalankan `npm run report`)

---

## Project Structure

Struktur project ini dirancang menggunakan pendekatan **Page Object Model (POM)** yang *Scalable, Maintainable, dan Reusable*:

```text
playwright-framework/
├── tests/
│   ├── login.spec.js             # Task 3: UI Automation - Login scenarios
│   ├── checkout.spec.js          # Task 3: UI Automation - E2E Checkout Flow ('Sauce Labs Onesie')
│   ├── search.spec.js            # Task 3: UI Automation - Product catalog & sorting verification
│   └── petstore.api.spec.js      # Task 2: API Automation - POST /pet, GET /pet/findByStatus, DELETE /pet/{petId}
├── pages/
│   ├── LoginPage.js              # Page Object Model untuk halaman Login
│   ├── HomePage.js               # Page Object Model untuk halaman Inventory/Home
│   └── CheckoutPage.js           # Page Object Model untuk halaman Cart & Checkout
├── fixtures/
│   └── baseTest.js               # Custom Playwright fixtures (loginPage, homePage, checkoutPage, authenticatedPage, petstoreApi)
├── utils/
│   ├── constants.js              # Konstanta aplikasi (URL regex, pesan error/sukses, status enum)
│   ├── testData.js               # Helper & generator payload data uji
│   └── helpers.js                # Fungsi utilitas (screenshot helper & PetstoreApiHelper)
├── locators/
│   ├── loginLocators.js          # Centralized locators untuk halaman Login
│   ├── homeLocators.js           # Centralized locators untuk halaman Home/Inventory
│   └── checkoutLocators.js       # Centralized locators untuk halaman Cart & Checkout
├── config/
│   └── env.js                    # Konfigurasi environment (Base URL UI & API, timeout, headless)
├── test-data/
│   └── users.json                # External test data (kredensial user SauceDemo & data customer checkout)
├── reports/
│   ├── html-report/              # Playwright interactive HTML report
│   ├── test-results.json         # Hasil eksekusi test dalam format JSON
│   └── Automation_Test_Report.md # Ringkasan laporan hasil eksekusi automasi
├── screenshots/                  # Bukti tangkapan layar (screenshots) eksekusi UI & ketika terjadi kegagalan
├── Task_1_docs/
│   └── Task1_Manual_API_Test_and_Bug_Report.xlsx # Task 1 Manual API Test & Bug Report (3 Sheets)
├── playwright.config.js          # Konfigurasi utama Playwright
├── package.json                  # Dependencies dan npm scripts
└── README.md                     # Dokumentasi panduan penggunaan project
```

---

## Prasyarat (Prerequisites)

Pastikan perangkat Anda telah terinstal:
- **Node.js** (v18 atau lebih baru direkomendasikan)
- **npm** (bawaan Node.js)

---

## Cara Instalasi (Installation)

1. Clone repository ini dan masuk ke direktori project:
   ```bash
   git clone https://github.com/Lyytyaa/projectindico.git
   cd projectindico
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install browser Playwright (Chromium):
   ```bash
   npx playwright install chromium
   ```

---

## Cara Menjalankan Test (How to Run Tests)

### 1. Menjalankan Seluruh Test (Task 2 API + Task 3 UI)
```bash
npm test
```
atau:
```bash
npx playwright test
```

### 2. Menjalankan Hanya Task 2 – API Automation Test (Petstore Swagger)
```bash
npm run test:api
```
*(Menjalankan `npx playwright test tests/petstore.api.spec.js`)*

### 3. Menjalankan Hanya Task 3 – UI Automation Test (SauceDemo Login & Checkout)
```bash
npm run test:ui
```
*(Menjalankan `npx playwright test tests/login.spec.js tests/checkout.spec.js`)*

### 4. Menjalankan Test dengan Tampilan Browser (Headed Mode)
```bash
npm run test:headed
```

---

## Cara Melihat Laporan Hasil Test (Test Reports)

Setelah perintah `npm test` dijalankan, **seluruh laporan automasi di dalam folder `reports/` akan otomatis di-generate ulang (dinamis)** mengikuti hasil aktual eksekusi test saat itu (termasuk jika Anda mengubah data di [`test-data/users.json`](./test-data/users.json)):

1. **Interactive HTML Report (Dinamis - Direkomendasikan):**
   ```bash
   npm run report
   ```
   *(Menjalankan `npx playwright show-report reports/html-report` — membuka dashboard web interaktif di browser yang menampilkan status Pass/Fail, durasi, log setiap step, screenshot otomatis saat gagal, video rekaman, dan Trace Viewer).*

2. **Markdown & JSON Automation Report (Dinamis - Auto-generated setiap `npm test`):**
   - [`reports/Automation_Test_Report.md`](./reports/Automation_Test_Report.md) — Di-generate otomatis oleh custom reporter [`utils/markdownReporter.js`](./utils/markdownReporter.js) setiap selesai running test.
   - [`reports/test-results.json`](./reports/test-results.json) — Output JSON otomatis dari Playwright.
   - [`screenshots/`](./screenshots/) — Bukti screenshot eksekusi UI (otomatis ter-update dan menyimpan screenshot error `FAIL_*.png` jika ada test yang gagal).

3. **Dokumen Manual API Test (Task 1) & Bug Report (Statis - Dokumentasi Hasil Uji Manual):**
   - Laporan Task 1 & Bug Report (Excel 3 Sheets): [`Task_1_docs/Task1_Manual_API_Test_and_Bug_Report.xlsx`](./Task_1_docs/Task1_Manual_API_Test_and_Bug_Report.xlsx)

