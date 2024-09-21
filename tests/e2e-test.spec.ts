// tests/addArtwork.spec.ts
import { test, expect } from '@playwright/test';
// @ts-ignore
import path from 'path';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ArtworksPage } from '../pages/ArtworksPage';
import { AddArtworkPage } from '../pages/AddArtworkPage';
import { ArtworkDetailsPage } from '../pages/ArtworkDetailsPage';
import config from '../data/config.json';


test('Add a new artwork and submit a review', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const artworksPage = new ArtworksPage(page);
    const addArtworkPage = new AddArtworkPage(page);
    const artworkDetailsPage = new ArtworkDetailsPage(page);

    // Generate a dynamic artwork title
    const artworkTitle = 'Test New Art Work ' + Date.now();

    // Go to the homepage and navigate to login
    await homePage.goto();
    await homePage.clickLogin();

    // Log in to the application
    await loginPage.login(config.username, config.password);

    // Navigate to 'Artworks' and click 'Add Artwork'
    await dashboardPage.navigateToArtworks();
    await artworksPage.clickAddArtwork();

    // Fill in artwork details
    await addArtworkPage.fillArtworkDetails(artworkTitle);

    // Upload the artwork image
    const filePath = path.resolve('resources/image.jpg'); // Adjust the path accordingly
    await addArtworkPage.uploadFile(filePath);

    // Select category, year, production volume, and date
    await addArtworkPage.selectCategory('Portraits');
    await addArtworkPage.selectYear('2020');
    await addArtworkPage.selectProductionVolume('10 - 24 /year');
    await addArtworkPage.selectCreatedOnDate();

    // Check 'Artist Royalty' and another 'Yes' option
    await addArtworkPage.checkArtistRoyalty();
    await addArtworkPage.checkAnotherYesOption();

    // Publish the artwork
    await addArtworkPage.publishArtwork();

    // Verify the new artwork is displayed
    await expect(page.getByRole('heading', { name: artworkTitle })).toBeVisible();
    await page.getByRole('heading', { name: artworkTitle }).click();

    // Submit a review for the artwork
    await artworkDetailsPage.navigateToReviews();
    await artworkDetailsPage.submitReview('Review Test', 'Test Automation');
});