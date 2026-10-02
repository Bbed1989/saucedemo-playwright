# SauceDemo – Playwright E2E Tests

Automated end-to-end tests for [saucedemo.com](https://www.saucedemo.com), written with Playwright.

## What is covered

## What is covered

- **Login**: successful login with a valid user
- **Cart**: add item, add two items, remove item
- **Checkout**: order overview with correct item and total, checkout with one and two items, finishing the order
- **Auth setup**: logs in once and reuses the saved session across tests

## Tech stack

- Playwright (TypeScript/JavaScript)
- GitHub Actions (CI)

## Getting started

```bash
npm ci
npx playwright install
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

## CI

Tests run automatically on every push via GitHub Actions
(see `.github/workflows`).

## Project structure

- `tests/` – test specs
- `playwright.config.ts` – Playwright configuration