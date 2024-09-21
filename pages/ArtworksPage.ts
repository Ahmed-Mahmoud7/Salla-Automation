import { expect, Page, Locator } from '@playwright/test';

export class ArtworksPage {
    readonly page: Page;
    readonly addArtworkLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addArtworkLink = page.getByRole('link', { name: 'Add Artwork' });
    }

    async clickAddArtwork() {
        await expect(this.addArtworkLink).toBeVisible();
        await this.addArtworkLink.click();
    }
}
