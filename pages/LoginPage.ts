import { expect, Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('Enter Email Address');
        this.passwordInput = page.getByPlaceholder('Enter Your Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async login(email: string, password: string) {
        await expect(this.emailInput).toBeVisible();
        await this.emailInput.fill(email);

        await expect(this.passwordInput).toBeVisible();
        await this.passwordInput.fill(password);

        await expect(this.loginButton).toBeEnabled();
        await this.loginButton.click();
    }
}
