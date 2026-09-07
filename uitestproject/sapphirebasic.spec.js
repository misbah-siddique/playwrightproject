// @ts-check
import { test, expect } from '@playwright/test';

test('is website valid', async ({ page }) => {
  await page.goto('https://pk.sapphireonline.pk/');
await expect(page).toHaveURL('https://pk.sapphireonline.pk/');
  // Expect a title "to contain" a substring.
});

test('website is not sapphireblue', async ({ page }) => {
  await page.goto('https://pk.sapphireonline.pk/');

  await expect(page).not.toHaveURL(
    'https://pk.sapphireblue.pk/'
  );
});

test('Sale text available', async ({ page }) => {
  await page.goto('https://pk.sapphireonline.pk/');
  await expect(page).toHaveURL('https://pk.sapphireonline.pk/');
 const saleHeading = page.getByRole('heading', { name: 'SALE' });
await expect(saleHeading).toBeVisible();
});


test('if 50% sale exists', async ({ page }) => {
await page.goto('https://pk.sapphireonline.pk/');
await expect(page).toHaveURL('https://pk.sapphireonline.pk/');
await expect(page.getByText('50% OFF').first()).toBeVisible();
});

test('Intermix section available', async ({ page }) => {
  await page.goto('https://pk.sapphireonline.pk/');

  await expect(
    page.getByText(/INTERMIX NEW ARRIVAL/i).first()
  ).toBeVisible();
});