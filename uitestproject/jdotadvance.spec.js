const { test, expect } = require('@playwright/test');

// junaidjamshed.com - no login needed.
// The site asks which country you are shipping to. We always pick Pakistan.

// takes the number out of "Sale price PKR.8,990"
function toNumber(text) {
  return Number(text.replace(/\s/g, '').match(/PKR\.?([\d,]+)/i)[1].replace(/,/g, ''));
}

test('J.: add 2 kameez shalwar to the cart and check the total', async ({ page }) => {

  // open the site
  await page.goto('https://www.junaidjamshed.com/');

  // say no to cookies (this banner can cover the buttons)
  await page.locator('#shopify-pc_banner_btn-decline').click({ timeout: 15000 }).catch(() => {});

  // The site opens on a full-page "Select Your Country" screen.
  // We always pick Pakistan.
  const pakistan = page.locator('#country-select-w a[data-location-name="pakistan"]');
  await pakistan.click({ timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(3000);

  // if that screen is somehow still there, remember the choice ourselves
  if (await page.locator('.loc-sel-window').isVisible().catch(() => false)) {
    await page.evaluate(() => localStorage.setItem('selectedLocation', 'pakistan'));
    await page.reload();
  }

  // go to the men's kameez shalwar collection
  await page.goto('https://www.junaidjamshed.com/collections/mens-kameez-shalwar');

  // take the addresses of the first 2 products
  const links = await page.$$eval('.hdt-collection-products a[href*="/products/"]', (all) =>
    [...new Set(all.map((a) => a.pathname))].slice(0, 2)
  );

  // open each one, note the price, pick a size, add it to the cart
  let myTotal = 0;

  for (const link of links) {
    await page.goto('https://www.junaidjamshed.com' + link);

    const priceText = await page.locator('.hdt-price').first().innerText();
    myTotal = myTotal + toNumber(priceText);
    console.log('Adding', link);

    // The Add button stays greyed out until a size is chosen, and sold-out
    // sizes have the class "is-disabled", so we pick the first one in stock.
    // Both are looked for inside the main product box, because the suggested
    // products further down the page have their own size and Add buttons.
    await page.locator('.hdt-product-info__list label.hdt-product-form_value:not(.is-disabled)').first().click();
    await page.locator('.hdt-main-product-form button[name="add"]').click();
    await page.waitForTimeout(3000);
  }

  // open the cart and read the total the website shows
  await page.goto('https://www.junaidjamshed.com/cart');
  const websiteTotal = toNumber(await page.locator('.hdt-totals__total-value').first().innerText());

  console.log('mine:', myTotal, ' website:', websiteTotal);
  expect(websiteTotal).toBeCloseTo(myTotal, 2);
});