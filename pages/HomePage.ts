import { expect, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly loginLink;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Login' });
    }

    async goto() {
        await this.page.goto('/');
        await this.page.waitForTimeout(3000);
    }

    async clickLogin() {
        await expect(this.loginLink).toBeVisible();
        await this.loginLink.click();
    }
}
