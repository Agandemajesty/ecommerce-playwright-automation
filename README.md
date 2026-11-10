# E-Commerce Playwright Test Automation Framework

## Project Overview

This project is an end-to-end web application test automation framework built with **Playwright, TypeScript, Node.js, Git and GitHub Actions**.

The framework automates critical e-commerce user journeys, including authentication, product inventory, shopping cart management and checkout.

The project demonstrates practical Quality Assurance (QA) engineering skills, test automation architecture, cross-browser testing and Continuous Integration (CI).

**Application Under Test:** [SauceDemo](https://www.saucedemo.com/)

## Technology Stack

| Technology | Purpose |
|---|---|
| Playwright | End-to-end test automation |
| TypeScript | Programming language |
| Node.js | JavaScript runtime |
| Git | Version control |
| GitHub | Source code repository |
| GitHub Actions | Continuous Integration |
| HTML Reporter | Test execution reporting |
| Page Object Model | Test automation design pattern |

## Project Structure

```text
ecommerce-playwright-automation/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/
│   ├── ecommerce-login.spec.ts
│   ├── inventory.spec.ts
│   └── example.spec.ts
│
├── test-data/
│   └── users.ts
│
├── playwright.config.ts
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Git
- Visual Studio Code

### Clone the repository

```bash
git clone https://github.com/Agandemajesty/ecommerce-playwright-automation.git
```

### Navigate into the project

```bash
cd ecommerce-playwright-automation
```

### Install dependencies

```bash
npm ci
```

### Install Playwright browsers

```bash
npx playwright install
```

## Test Execution

### Run all tests

```bash
npx playwright test
```

### Run tests in Chromium

```bash
npx playwright test --project=chromium
```

### Run a specific test file

```bash
npx playwright test tests/ecommerce-login.spec.ts
```

### Run tests with a visible browser

```bash
npx playwright test --headed
```

### Open the HTML test report

```bash
npx playwright show-report
```

## Test Coverage

| Module | Test Coverage | Status |
|---|---|---|
| Authentication | Valid login, locked-out user, invalid credentials and empty credentials | Implemented and passed |
| Inventory | Product visibility, product count and sorting | In progress |
| Shopping Cart | Add, remove and validate cart items | Planned |
| Checkout | Customer information, order summary and order completion | Planned |
| Navigation | Menu, logout and page navigation | Planned |
| Negative Testing | Invalid inputs and boundary scenarios | Planned |
| Cross-Browser Testing | Chromium, Firefox and WebKit | Configured |

## Automation Framework Design

This project uses the Page Object Model (POM) design pattern.

Page-specific elements and actions are maintained in reusable page classes, while test scenarios are maintained separately in the tests directory.

Test data is stored separately to improve maintainability and reusability.

## Continuous Integration

GitHub Actions is configured to execute Playwright tests automatically when changes are pushed to the repository or submitted through pull requests.

## Test Reporting

The framework uses the Playwright HTML Reporter to provide execution results, including passed, failed and skipped tests.

Screenshots, videos and traces are configured to assist with failure investigation.

## Author

**Agande Majesty**

QA Engineer | Software Test Automation

GitHub: https://github.com/Agandemajesty

## Repository

https://github.com/Agandemajesty/ecommerce-playwright-automation

---

*This project is actively being developed. Test coverage and documentation will be updated as additional automation modules are completed.*