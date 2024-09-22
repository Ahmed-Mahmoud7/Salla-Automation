import {expect, Locator, Page} from '@playwright/test';

export class ArtworksPage {
    readonly page: Page;
    readonly addArtworkLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addArtworkLink = page.getByRole('link', { name: 'Add Artwork' });
    }

    /**
     * Selects an artwork by its title.
     * @param title The title of the artwork to select.
     */
    async selectArtworkByTitle(title: string) {
        // Locate the artwork heading using the provided title
        const artworkHeading = this.page.getByRole('heading', { name: title });

        // Wait for the artwork heading to be visible
        await expect(artworkHeading).toBeAttached();

        // Click on the artwork heading to navigate to the artwork's detail page
        await artworkHeading.click();
    }

    async clickAddArtwork() {
        await expect(this.addArtworkLink).toBeVisible();
        await this.addArtworkLink.click();
    }
}
