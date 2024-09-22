// tests/addArtwork.spec.ts
import { test } from '@playwright/test';
// @ts-ignore
import path from 'path';
import  {PageManager} from "../pages/PageManager";
import config from '../data/config.json';
import logger from  '../utils/logger';


test('Add a new artwork and submit a review', async ({ page }) => {
    const pm = new PageManager(page)

    // Generate a dynamic artwork title
    const artworkTitle = 'Test New Art Work ' + Date.now();

    await pm.onHomePage().goto();
    await pm.onHomePage().clickLogin();
    logger.info('Go to the homepage and navigate to login');
    await pm.onLoginPage().login(config.username, config.password);
    logger.info('Log in to the application');
    await pm.onDashboardPage().navigateToArtworks();
    await pm.onArtWorksPage().clickAddArtwork();
    logger.info('Navigate to Artworks and click Add Artwork');
    await pm.onAddArtWorkPage().fillArtworkDetails(artworkTitle);
    logger.info('Fill in artwork details');
    const filePath = path.resolve('resources/image.jpg'); // Adjust the path accordingly
    await pm.onAddArtWorkPage().uploadFile(filePath);
    logger.info('Upload the artwork image');
    await pm.onAddArtWorkPage().selectCategory('Portraits');
    await pm.onAddArtWorkPage().selectYear('2020');
    await pm.onAddArtWorkPage().selectProductionVolume('10 - 24 /year');
    await pm.onAddArtWorkPage().selectCreatedOnDate();
    logger.info('Select category, year, production volume, and date');
    await pm.onAddArtWorkPage().checkArtistRoyalty();
    await pm.onAddArtWorkPage().checkAnotherYesOption();
    logger.info('Check \'Artist Royalty\' and another \'Yes\' option');
    await pm.onAddArtWorkPage().publishArtwork();
    logger.info('Publish the artwork');
    await pm.onArtWorksPage().selectArtworkByTitle(artworkTitle);
    logger.info('Verify the new artwork is displayed After Creation');
    await pm.onArtWorkDetailsPage().navigateToReviews();
    await pm.onArtWorkDetailsPage().submitReview('Review Test', 'Test Automation');
    logger.info('Submit a review for the artwork');
});