import { test, expect } from '@playwright/test';
// @ts-ignore
import path from 'path';

test('test', async ({ page }) => {
    // Go to the homepage
    await page.goto('https://staging.alt.art/');
    await page.waitForTimeout(3000);
    // Wait for the 'Login' link to be visible and click it
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
    await page.getByRole('link', { name: 'Login' }).click();

    // Fill in the email address
    await expect(page.getByPlaceholder('Enter Email Address')).toBeVisible();
    await page.getByPlaceholder('Enter Email Address').fill('jamiwa8396@tospage.com');

    // Fill in the password
    await expect(page.getByPlaceholder('Enter Your Password')).toBeVisible();
    await page.getByPlaceholder('Enter Your Password').fill('nhk9dad2EQW!xae_bpm');

    // Click the 'Login' button
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
    await page.getByRole('button', { name: 'Login' }).click();

    // Navigate to 'Artworks'
    await expect(page.getByRole('link', { name: 'Artworks' })).toBeVisible();
    await page.getByRole('link', { name: 'Artworks' }).click();

    // Click 'Add Artwork'
    await expect(page.getByRole('link', { name: 'Add Artwork' })).toBeVisible();
    await page.getByRole('link', { name: 'Add Artwork' }).click();

    // Fill in the artwork title
    const artworkTitle = 'Test New Art Work ' + Date.now();
    await expect(page.getByPlaceholder('Text here...')).toBeVisible();
    await page.getByPlaceholder('Text here...').fill(artworkTitle);

    // Select Edition Type
    await expect(page.getByRole('button', { name: 'Select Edition Type' })).toBeVisible();
    await page.getByRole('button', { name: 'Select Edition Type' }).click();
    await expect(page.getByText('Limited Edition')).toBeVisible();
    await page.getByText('Limited Edition').click();

    // Fill in the description
    await expect(page.getByText('Description *Nothing')).toBeVisible();
    await page.getByText('Description *Nothing').click();
    await expect(page.locator('.ce-paragraph')).toBeVisible();
    await page.locator('.ce-paragraph').fill('Test Desc');

    // Fill in the current price
    await expect(page.locator('#current_price')).toBeVisible();
    await page.locator('#current_price').fill('100');

    // Select currency for current price
    await expect(page.locator('div').filter({ hasText: /^ETH \( Ethereum \)$/ }).first()).toBeVisible();
    await page.locator('div').filter({ hasText: /^ETH \( Ethereum \)$/ }).first().click();
    await expect(page.getByRole('option', { name: 'USD' })).toBeVisible();
    await page.getByRole('option', { name: 'USD' }).click();

    // Fill in the primary sale price
    await expect(page.locator('#primary_sale_price')).toBeVisible();
    await page.locator('#primary_sale_price').fill('111');

    // Select currency for primary sale price
    await expect(page.locator('div:nth-child(5) > div > .lg\\:w-\\[15\\%\\] > .wallet-input > .css-1aagls8-control > .css-hlgwow > .css-19bb58m')).toBeVisible();
    await page.locator('div:nth-child(5) > div > .lg\\:w-\\[15\\%\\] > .wallet-input > .css-1aagls8-control > .css-hlgwow > .css-19bb58m').click();
    await expect(page.getByRole('option', { name: 'USD' })).toBeVisible();
    await page.getByRole('option', { name: 'USD' }).locator('span').click();

    // Upload the file directly to the hidden input element
    const filePath = path.resolve('resources/image.jpg'); // Adjust the path accordingly
    await page.setInputFiles('input[type="file"]', filePath);

    // Select category 'Portraits'
    await expect(page.locator('.undefined > .css-1aagls8-control > .css-hlgwow > .css-19bb58m').first()).toBeVisible();
    await page.locator('.undefined > .css-1aagls8-control > .css-hlgwow > .css-19bb58m').first().click();
    await expect(page.getByRole('option', { name: 'Portraits' })).toBeVisible();
    await page.getByRole('option', { name: 'Portraits' }).click();

    // Select year '2023'
    await page.locator('.undefined > .css-1aagls8-control > .css-hlgwow > .css-19bb58m').first().click();
    await expect(page.getByRole('option', { name: '2023' })).toBeVisible();
    await page.getByRole('option', { name: '2023' }).click();

    // Select production volume '25 - 49 /year'
    await expect(page.locator('.undefined > .css-1aagls8-control > .css-hlgwow > .css-19bb58m')).toBeVisible();
    await page.locator('.undefined > .css-1aagls8-control > .css-hlgwow > .css-19bb58m').click();
    await expect(page.getByText('25 - 49 /year', { exact: true })).toBeVisible();
    await page.getByText('25 - 49 /year', { exact: true }).click();

    // Select 'Created On' date
    await expect(page.locator('div').filter({ hasText: /^Created On \*Choose Date$/ }).getByRole('button')).toBeVisible();
    await page.locator('div').filter({ hasText: /^Created On \*Choose Date$/ }).getByRole('button').click();
    await expect(page.getByRole('gridcell', { name: '20' })).toBeVisible();
    await page.getByRole('gridcell', { name: '21' }).click();

    // Check 'Artist Royalty' as 'Yes'
    await expect(page.locator('div').filter({ hasText: /^Artist Royalty \*YesNo$/ }).getByLabel('Yes')).toBeVisible();
    await page.locator('div').filter({ hasText: /^Artist Royalty \*YesNo$/ }).getByLabel('Yes').check();

    // Check another 'Yes' option
    await expect(page.locator('div').filter({ hasText: /^YesNo$/ }).getByLabel('Yes')).toBeVisible();
    await page.locator('div').filter({ hasText: /^YesNo$/ }).getByLabel('Yes').check();

    // Click 'Publish' button
    //await expect(page.getByRole('button', { name: 'Publish' })).toBeEnabled();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Publish' }).click();

    // Verify the new artwork is displayed
    await expect(page.getByRole('heading', { name: artworkTitle })).toBeVisible();
    await page.getByRole('heading', { name: artworkTitle }).click();

    // Navigate to 'Reviews' tab
    await expect(page.getByRole('tab', { name: 'Reviews' })).toBeVisible();
    await page.getByRole('tab', { name: 'Reviews' }).click();

    // Fill in the review title
    await expect(page.getByPlaceholder('Title')).toBeVisible();
    await page.getByPlaceholder('Title').fill('Review Test');

    // Fill in the review detail
    await expect(page.getByPlaceholder('Review Detail')).toBeVisible();
    await page.getByPlaceholder('Review Detail').fill('Test Automation');

    // Submit the review
    await expect(page.getByLabel('Reviews').getByRole('button')).toBeEnabled();
    await page.getByLabel('Reviews').getByRole('button').click();
});