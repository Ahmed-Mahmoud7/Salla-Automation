// tests/addArtwork.spec.ts
import { test, expect } from '@playwright/test';
// @ts-ignore
import path from 'path';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ArtworksPage } from '../pages/ArtworksPage';
import { AddArtworkPage } from '../pages/AddArtworkPage';
import { ArtworkDetailsPage } from '../pages/ArtWorkDetailsPage';
import config from '../data/config.json';
import logger from  '../utils/logger';


test('Add a new artwork and submit a review', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const artworksPage = new ArtworksPage(page);
    const addArtworkPage = new AddArtworkPage(page);
    const artworkDetailsPage = new ArtworkDetailsPage(page);

    // Generate a dynamic artwork title
    const artworkTitle = 'Test New Art Work ' + Date.now();

    await homePage.goto();
    await homePage.clickLogin();
    logger.info('Go to the homepage and navigate to login');
    await loginPage.login(config.username, config.password);
    logger.info('Log in to the application');
    await dashboardPage.navigateToArtworks();
    await artworksPage.clickAddArtwork();
    logger.info('Navigate to Artworks and click Add Artwork');
    await addArtworkPage.fillArtworkDetails(artworkTitle);
    logger.info('Fill in artwork details');
    const filePath = path.resolve('resources/image.jpg'); // Adjust the path accordingly
    await addArtworkPage.uploadFile(filePath);
    logger.info('Upload the artwork image');
    await addArtworkPage.selectCategory('Portraits');
    await addArtworkPage.selectYear('2020');
    await addArtworkPage.selectProductionVolume('10 - 24 /year');
    await addArtworkPage.selectCreatedOnDate();
    logger.info('Select category, year, production volume, and date');
    await addArtworkPage.checkArtistRoyalty();
    await addArtworkPage.checkAnotherYesOption();
    logger.info('Check \'Artist Royalty\' and another \'Yes\' option');
    await addArtworkPage.publishArtwork();
    logger.info('Publish the artwork');
    await expect(page.getByRole('heading', { name: artworkTitle })).toBeVisible();
    await page.getByRole('heading', { name: artworkTitle }).click();
    logger.info('Verify the new artwork is displayed After Creation');
    await artworkDetailsPage.navigateToReviews();
    await artworkDetailsPage.submitReview('Review Test', 'Test Automation');
    logger.info('Submit a review for the artwork');
});