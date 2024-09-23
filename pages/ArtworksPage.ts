import {expect, Locator, Page} from '@playwright/test';
import {assertElementToBeActionable} from '../utils/customAssertion';

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

        // Use custom assertion to ensure the element is actionable
        await assertElementToBeActionable(artworkHeading);



        // Click on the artwork heading to navigate to the artwork's detail page
        await artworkHeading.click();
    }

    async clickAddArtwork() {
        await expect(this.addArtworkLink).toBeVisible();
        await this.addArtworkLink.click();
    }
}
