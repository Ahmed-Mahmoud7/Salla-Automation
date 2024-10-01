import {expect, Locator, Page} from '@playwright/test';

export class AddArtworkPage {
    readonly page: Page;
    readonly titleInput: Locator;
    readonly editionTypeButton: Locator;
    readonly limitedEditionOption: Locator;
    readonly descriptionPlaceholder: Locator;
    readonly descriptionInput: Locator;
    readonly currentPriceInput: Locator;
    readonly currentPriceCurrencyDropdown: Locator;
    readonly usdOption: Locator;
    readonly primarySalePriceInput: Locator;
    readonly primarySaleCurrencyDropdown: Locator;
    readonly selectFileInput: Locator;
    readonly categoryDropdown: Locator;
    readonly yearDropdown: Locator;
    readonly productionVolumeDropdown: Locator;
    readonly createdOnButton: Locator;
    readonly artistRoyaltyYesOption: Locator;
    readonly anotherYesOption: Locator;
    readonly publishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleInput = page.getByPlaceholder('Text here...');
        this.editionTypeButton = page.getByRole('button', {name: 'Select Edition Type'});
        this.limitedEditionOption = page.getByText('Limited Edition');
        this.descriptionPlaceholder = page.getByText('Description *Nothing');
        this.descriptionInput = page.locator('.ce-paragraph');
        this.currentPriceInput = page.locator('#current_price');
        this.currentPriceCurrencyDropdown = page.locator('div').filter({hasText: /^ETH \( Ethereum \)$/}).first();
        this.usdOption = page.getByRole('option', {name: 'USD'});
        this.primarySalePriceInput = page.locator('#primary_sale_price');
        this.primarySaleCurrencyDropdown = page.locator(
            'div:nth-child(5) > div > .lg\\:w-\\[15\\%\\] > .wallet-input > .css-1aagls8-control > .css-hlgwow > .css-19bb58m'
        );
        this.selectFileInput = page.locator('input[type="file"]');
        this.categoryDropdown = page.locator('.undefined > .css-1aagls8-control > .css-hlgwow > .css-19bb58m').nth(0);
        this.yearDropdown = page.locator('.undefined > .css-1aagls8-control > .css-hlgwow > .css-19bb58m');
        this.productionVolumeDropdown = page.locator('.undefined > .css-1aagls8-control > .css-hlgwow > .css-19bb58m');
        this.createdOnButton = page.locator('div').filter({hasText: /^Created On \*Choose Date$/}).getByRole('button');
        this.artistRoyaltyYesOption = page.locator('div').filter({hasText: /^Artist Royalty \*YesNo$/}).getByLabel('Yes');
        this.anotherYesOption = page.locator('div').filter({hasText: /^YesNo$/}).getByLabel('Yes');
        this.publishButton = page.getByRole('button', {name: 'Publish'});
    }

    async fillArtworkDetails(artworkTitle: string) {
        await expect(this.titleInput).toBeVisible();
        await this.titleInput.fill(artworkTitle);

        await expect(this.editionTypeButton).toBeVisible();
        await this.editionTypeButton.click();
        await expect(this.limitedEditionOption).toBeVisible();
        await this.limitedEditionOption.click();

        await expect(this.descriptionPlaceholder).toBeVisible();
        await this.descriptionPlaceholder.click();
        await expect(this.descriptionInput).toBeVisible();
        await this.descriptionInput.fill('Test Desc');

        await expect(this.currentPriceInput).toBeVisible();
        await this.currentPriceInput.fill('100');

        await expect(this.currentPriceCurrencyDropdown).toBeVisible();
        await this.currentPriceCurrencyDropdown.click();
        await expect(this.usdOption).toBeVisible();
        await this.usdOption.click();

        await expect(this.primarySalePriceInput).toBeVisible();
        await this.primarySalePriceInput.fill('111');

        await expect(this.primarySaleCurrencyDropdown).toBeVisible();
        await this.primarySaleCurrencyDropdown.click();
        await expect(this.usdOption).toBeVisible();
        await this.usdOption.locator('span').click();
    }

    async uploadFile(filePath: string) {
        await this.selectFileInput.setInputFiles(filePath);
    }

    async selectCategory(categoryName: string) {
        await expect(this.categoryDropdown).toBeVisible();
        await this.categoryDropdown.click();
        await expect(this.page.getByRole('option', {name: categoryName})).toBeVisible();
        await this.page.getByRole('option', {name: categoryName}).click();
    }

    async selectYear(year: string) {
        await this.yearDropdown.first().click();
        await expect(this.page.getByRole('option', {name: year})).toBeAttached();
        await this.page.getByRole('option', {name: year}).click();
    }

    async selectProductionVolume(volume: string) {
        await expect(this.productionVolumeDropdown).toBeVisible();
        await this.productionVolumeDropdown.click();
        await expect(this.page.getByText(volume, {exact: true})).toBeVisible();
        await this.page.getByText(volume, {exact: true}).click();
    }

    /**
     * Selects a random available date from the "Created On" date picker.
     *
     * This method performs the following steps:
     * 1. Ensures the "Created On" button is visible and clicks it.
     * 2. Retrieves all day elements that are not disabled.
     * 3. Counts the number of available day elements.
     * 4. Selects a random day from the available days.
     * 5. Ensures the selected day element is visible and enabled.
     * 6. Clicks the selected day element.
     */
    async selectCreatedOnDate() {
        await expect(this.createdOnButton).toBeVisible();
        await this.createdOnButton.click();

        const possibleDays = this.page.locator('button[name="day"][role="gridcell"]:not([disabled])');
        const count = await possibleDays.count();
        const getRandomIndex = (max: number) => Math.floor(Math.random() * max);
        const randomIndex = getRandomIndex(count);
        const randomDay = possibleDays.nth(randomIndex);

        await randomDay.waitFor({state: 'visible', timeout: 5000});
        await randomDay.isEnabled({timeout: 5000});
        await randomDay.click();
    }

    async checkArtistRoyalty() {
        await expect(this.artistRoyaltyYesOption).toBeVisible();
        await this.artistRoyaltyYesOption.check();
    }

    async checkAnotherYesOption() {
        await expect(this.anotherYesOption).toBeVisible();
        await this.anotherYesOption.check();
    }

    async publishArtwork() {
        await expect(this.publishButton).toBeEnabled();
        await this.publishButton.click();
    }
}