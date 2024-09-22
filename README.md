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


# Project Structure 

```bash
project-root/
├── pages/                   # Page Object Model classes
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── ArtworksPage.ts
│   ├── AddArtworkPage.ts
│   └── ArtworkDetailsPage.ts
├── tests/                   # Test files
│   └── addArtwork.spec.ts
├── utils/                   # Utility modules
│   └── logger.ts
├── logs/                    # Log files
│   └── automation.log
├── config/                  # Configuration files
│   └── config.json          # Optional if not using environment variables
    
├── .gitignore
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # npm configuration
└── README.md                # Project documentation

