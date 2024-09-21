import { expect, Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly artworksLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.artworksLink = page.getByRole('link', { name: 'Artworks' });
    }

    async navigateToArtworks() {
        await expect(this.artworksLink).toBeVisible();
        await this.artworksLink.click();
    }
}
