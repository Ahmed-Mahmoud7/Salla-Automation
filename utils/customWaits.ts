import {Page} from '@playwright/test';


/**
 * Custom Waits for Playwright Tests
 *
 * This file contains reusable custom waits functions
 * to enhance test readability, maintainability, and robustness.
 */

/* ---------------------------- Custom Waits ---------------------------- */


/**
 * Waits for a specific selector to appear in the DOM and be visible.
 * @param page - The Playwright Page object.
 * @param selector - The selector of the element.
 * @param timeout - Timeout in milliseconds. Default is 5000ms.
 */
async function waitForSelectorToBeVisible(page: Page, selector: string, timeout: number = 5000) {
    await page.waitForSelector(selector, {state: 'visible', timeout});
}

/**
 * Waits for the page to navigate to the expected URL or URL pattern.
 * @param page - The Playwright Page object.
 * @param expectedUrl - The expected URL or a RegExp pattern.
 * @param timeout - Timeout in milliseconds. Default is 10000ms.
 */
async function waitForPageNavigation(page: Page, expectedUrl: string | RegExp, timeout: number = 10000) {
    await page.waitForURL(expectedUrl, {timeout});
}

/**
 * Waits until there are no active network requests for the specified duration.
 * @param page - The Playwright Page object.
 * @param idleTime - The duration in milliseconds to wait after the network becomes idle. Default is 500ms.
 */
async function waitForNetworkIdle(page: Page, idleTime: number = 500) {
    await page.waitForLoadState('networkidle', {timeout: idleTime});
}


/* --------------------------- Export All Waits -------------------------- */


export {
    waitForNetworkIdle,
    waitForPageNavigation,
    waitForSelectorToBeVisible,
};