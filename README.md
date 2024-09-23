# Introduction

This framework leverages Playwright for robust and reliable end-to-end testing, TypeScript for type safety and improved Test automation development experience, and implements the Page Object Model to enhance code maintainability and readability.

# Features

- TypeScript Support: Benefit from static typing and IntelliSense.
- Page Object Model (POM): Encapsulates page elements and interactions.
- Logging with Winston: Detailed logging for debugging and analysis.
- HTML Reporting: Generate comprehensive test reports.
- CI Integration: Seamless integration with GitHub Actions for automated testing.


# Prerequisites
Before setting up the project, ensure you have the following installed:

- Node.js (version 14 or above)
- npm (comes with Node.js)
- Git (for version control)

# Installation

Follow these steps to set up the project and install all dependencies:

Ensure you have **Node.js** and **npm** installed on your system. You can check if Node.js and npm are installed by
running the following commands:

- node -v
- npm -v

# Installing Playwright

Playwright is used for browser automation. After installing the Node.js dependencies, run the following command to
install Playwright and its browsers:

- npx playwright install

# Running Tests

You can now run the Playwright tests using the following command:

- npx playwright test

To run the test from NPM Scripts using this command:

- npm run sallaAutomationTask

To run a specific test file, for example, e2e-test.spec.ts, use:

- npx playwright test tests/e2e-test.spec.ts

To run the test on multiple browses 10 times :

- npx playwright test --project=chromium --project=firefox --project=webkit --repeat-each=10 --workers=5

To open the Playwright Test Report:

- npx playwright show-report

# Project Structure 

```bash
project-root/
├── .github/                
│   └── workflows/
│       └── main.yml         # GitHub Actions workflow
├── data/                    
│   └── config.json          # Configuration file
├── logs/                    
│   └── automation.log       # Log file
├── node_modules/            # Node.js modules
├── pages/                   # Page Object Model (POM) classes
│   ├── AddArtworkPage.ts    
│   ├── ArtWorkDetailsPage.ts
│   ├── ArtworksPage.ts      
│   ├── DashboardPage.ts     
│   ├── HomePage.ts          
│   ├── LoginPage.ts         
│   └── PageManager.ts       # Page Manager module
├── playwright-report/       # Playwright test report
├── resources/               
│   └── image.jpg            # Example resource
├── screenshots/             # Screenshots from tests
├── test-results/            # Test results output
├── tests/                   # Test files
│   └── e2e-test.spec.ts     # Example end-to-end test spec
├── utils/                   # Utility modules
│   ├── customAssertion.ts   
│   ├── customWaits.ts       
│   └── logger.ts            # Logger utility
├── .gitignore               # Git ignore file
├── package.json             # npm configuration
├── package-lock.json        # npm lock file
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation


