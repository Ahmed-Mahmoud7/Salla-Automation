import { expect, Page, Locator } from '@playwright/test';

export class ArtworkDetailsPage {
    readonly page: Page;
    readonly reviewsTab: Locator;
    readonly reviewTitleInput: Locator;
    readonly reviewDetailInput: Locator;
    readonly submitReviewButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.reviewsTab = page.getByRole('tab', { name: 'Reviews' });
        this.reviewTitleInput = page.getByPlaceholder('Title');
        this.reviewDetailInput = page.getByPlaceholder('Review Detail');
        this.submitReviewButton = page.getByLabel('Reviews').getByRole('button');
    }

    async navigateToReviews() {
        await expect(this.reviewsTab).toBeVisible();
        await this.reviewsTab.click();
    }

    async submitReview(title: string, detail: string) {
        await expect(this.reviewTitleInput).toBeVisible();
        await this.reviewTitleInput.fill(title);

        await expect(this.reviewDetailInput).toBeVisible();
        await this.reviewDetailInput.fill(detail);

        await expect(this.submitReviewButton).toBeEnabled();
        await this.submitReviewButton.click();
    }
}