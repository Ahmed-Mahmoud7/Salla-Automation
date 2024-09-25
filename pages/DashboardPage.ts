import {expect, Locator, Page} from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly artworksLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.artworksLink = page.getByRole('link', { name: 'Artworks' });
    }

    async navigateToArtworks() {
        await expect(this.artworksLink).toBeAttached();
        await this.artworksLink.click();
    }
}
