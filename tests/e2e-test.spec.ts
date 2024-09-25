// tests/addArtwork.spec.ts
import {test} from '@playwright/test';
import path from 'path';
import {PageManager} from '../pages/PageManager';
import config from '../data/config.json';
import logger from '../utils/logger';

test.describe('Artwork tests', () => {
    let pm: PageManager;
    let artworkTitle: string;

    test.beforeEach(async ({page}) => {
        pm = new PageManager(page);

        // Generate a dynamic artwork title
        artworkTitle = 'Test New Art Work ' + Date.now();

        // Navigate to the homepage and login
        await pm.onHomePage().goto();
        logger.info('Navigated to the homepage');

        await pm.onHomePage().clickLogin();
        logger.info('Clicked on login');

        await pm.onLoginPage().login(config.username, config.password);
        logger.info('Logged into the application');
    });

    test.afterEach(async ({page}) => {
        logger.info('Test completed');

    });

    test('Add a new artwork and submit a review', async ({page}) => {
        // Navigate to Artworks and click Add Artwork
        await pm.onDashboardPage().navigateToArtworks();
        logger.info('Navigated to Artworks');

        await pm.onArtWorksPage().clickAddArtwork();
        logger.info('Clicked on Add Artwork');

        // Fill in artwork details
        await pm.onAddArtWorkPage().fillArtworkDetails(artworkTitle);
        logger.info('Filled in artwork details with title:', artworkTitle);

        // Upload the artwork image
        const filePath = path.resolve('resources/image.jpg');
        await pm.onAddArtWorkPage().uploadFile(filePath);
        logger.info('Uploaded the artwork image');

        // Select category, year, production volume, and date
        await pm.onAddArtWorkPage().selectCategory('Portraits');
        await pm.onAddArtWorkPage().selectYear('2020');
        await pm.onAddArtWorkPage().selectProductionVolume('10 - 24 /year');
        await pm.onAddArtWorkPage().selectCreatedOnDate();
        logger.info('Selected category, year, production volume, and date');

        // Check 'Artist Royalty' and another 'Yes' option
        await pm.onAddArtWorkPage().checkArtistRoyalty();
        await pm.onAddArtWorkPage().checkAnotherYesOption();
        logger.info("Checked 'Artist Royalty' and another 'Yes' option");

        // Publish the artwork
        await pm.onAddArtWorkPage().publishArtwork();
        logger.info('Published the artwork');

        // Verify and assert that the new artwork is displayed after creation
        await pm.onArtWorksPage().selectArtworkByTitle(artworkTitle);
        await page.screenshot({path: 'screenshots/NewArtworkAddedSuccess.png', fullPage: true});
        logger.info('Verified the new artwork is displayed and took a screenshot');

        // Navigate to Reviews and submit a review
        await pm.onArtWorkDetailsPage().navigateToReviews();
        await pm.onArtWorkDetailsPage().submitReview('Review Test', 'Test Automation');
        logger.info('Submitted a review for the artwork');

        await page.screenshot({path: 'screenshots/ReviewAddedSuccess.png', fullPage: true});
    });
});