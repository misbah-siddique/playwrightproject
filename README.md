# Playwright UI Test Project

This project contains automated browser tests built with Playwright for validating key UI behaviors on retail websites. It includes checks for homepage availability, sale content, and cart totals for a few storefronts.

## Project purpose

The tests are designed to:

- verify that the main website loads correctly
- confirm important sale and promotional text is visible
- validate that pricing logic is consistent in cart scenarios
- automate browser-based checks for common retail flows

## Tech stack

- JavaScript
- Playwright Test
- Node.js
- HTML report generation

## Project structure

```text
playwrightproject/
├── README.md
├── package.json
├── playwright.config.js
├── playwright-report/
│   └── ... generated HTML test reports
├── test-results/
│   └── ... Playwright output and traces
├── uitestproject/
│   ├── sapphirebasic.spec.js
│   └── jdotadvance.spec.js
```

## Included test files

### sapphirebasic.spec.js
This file checks the Sapphire website homepage and content elements such as:

- homepage URL
- absence of an incorrect website URL
- visibility of a SALE heading
- presence of 50% OFF text
- visibility of the INTERMIX NEW ARRIVAL section

### jdotadvance.spec.js
This file checks a more advanced flow on Junaid Jamshed:

- open the store and handle country selection
- navigate to the men's kameez shalwar collection
- collect product links from the page
- open each product, pick a size, add to cart
- calculate the expected total from product prices
- compare the expected total with the cart total displayed on the site

## Configuration

The project configuration is defined in [playwright.config.js](playwright.config.js). It includes:

- test directory: `./uitestproject`
- parallel execution enabled
- Chromium project configured for desktop Chrome
- HTML reporter enabled
- timeout set to 180 seconds
- headless mode disabled for local execution
- trace captured on first retry

## Prerequisites

Before running the tests, make sure you have the following installed:

- Node.js (recommended latest LTS)
- npm

## Installation

From the project root, run:

```bash
npm install
```

If Playwright browsers are not installed yet, run:

```bash
npx playwright install
```

## Run the tests

Run the full test suite:

```bash
npm test
```

This executes:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test uitestproject/sapphirebasic.spec.js
```

Run a single test by name:

```bash
npx playwright test -g "Sale text available"
```

## Open the HTML report

```bash
npm run report
```

This launches the Playwright HTML report from the generated report files.

## Notes about the test execution

- The tests run in a real browser environment.
- Some flows depend on live websites and may be affected by website changes or layout updates.
- A few selectors are intentionally resilient to popups or country-selection prompts.
- Because tests target live sites, they may occasionally fail due to site updates or network issues.

## Useful commands

```bash
npx playwright test --headed
npx playwright test --ui
npx playwright test --reporter=line
```

## Troubleshooting

If the tests fail unexpectedly:

1. Check whether the target website layout has changed.
2. Ensure the browsers are installed correctly.
3. Confirm the site is accessible from your environment.
4. Re-run the test in headed mode to observe UI behavior.

## License

This project is currently set to the ISC license in [package.json](package.json).

## Summary

This repository is a lightweight Playwright automation project focused on validating storefront behavior through browser-driven UI tests. It is a practical example of end-to-end testing for live web applications and can be expanded with more pages, test cases, or cross-browser coverage.
