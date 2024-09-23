import {expect, Locator, Page} from '@playwright/test';

/**
 * Custom Assertions for Playwright Tests
 *
 * This file contains reusable custom assertion functions
 * to enhance test readability, maintainability, and robustness.
 */

/* ---------------------------- Custom Assertions ---------------------------- */

/**
 * Asserts that the element's text content contains the expected substring.
 * @param element - The Locator of the element to check.
 * @param expectedSubstring - The substring expected to be in the element's text.
 */
async function assertElementTextContains(element: Locator, expectedSubstring: string,) {
    const textContent = await element.textContent();
    expect(textContent).toContain(expectedSubstring);
}

/**
 * Asserts that the element is visible and enabled (i.e., actionable).
 * @param element - The Locator of the element to check.
 */
async function assertElementToBeActionable(element: Locator,) {
    await expect(element).toBeVisible();
    await expect(element).toBeEnabled();
}

/**
 * Asserts that the current page URL contains the expected path.
 * @param page - The Playwright Page object.
 * @param expectedPath - The expected path substring in the URL.
 */
async function assertUrlToContainPath(page: Page, expectedPath: string,) {
    const url = page.url();
    expect(url).toContain(expectedPath);
}


/**
 * Asserts that the element has the specified attribute with the expected value.
 * @param element - The Locator of the element.
 * @param attributeName - The name of the attribute.
 * @param expectedValue - The expected value of the attribute.
 */
async function assertElementAttribute(element: Locator, attributeName: string, expectedValue: string) {
    const attributeValue = await element.getAttribute(attributeName);
    expect(attributeValue).toBe(expectedValue);
}

/* --------------------------- Export All Assertions -------------------------- */

export {
    assertElementTextContains,
    assertElementToBeActionable,
    assertUrlToContainPath,
    assertElementAttribute,
};




