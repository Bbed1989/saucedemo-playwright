# SauceDemo – Playwright E2E Tests

Automated end-to-end tests for [SauceDemo](https://www.saucedemo.com), written with Playwright.

## What is covered

* **Login** – successful login with a valid user
* **Cart** – add item, add multiple items, remove item
* **Checkout** – checkout with one or multiple items, verify order details and totals, finish an order
* **Authentication** – login once during setup and reuse the saved session across tests

## Test architecture

The project uses the **Page Object Model (POM)** to separate test scenarios from page interactions.

* `InventoryPage` – inventory page actions such as adding items and opening the cart
* `CartPage` – cart actions such as removing items and starting checkout
* `CheckoutPage` – checkout form and order completion actions

Assertions remain in the test files, while page-specific interactions are encapsulated in Page Objects.

## Tech stack

* Playwright
* JavaScript
* GitHub Actions (CI)

## Getting started

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

Run tests:

```bash
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

## CI

Tests run automatically on every push via GitHub Actions.

Workflow configuration:

```text
.github/workflows/playwright.yml
```

## Project structure

```text
.
├── pages/
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests/
│   ├── auth.setup.js
│   ├── login.spec.js
│   └── shopping.spec.js
├── playwright.config.ts
└── README.md
```
