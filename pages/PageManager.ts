import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ArtworksPage } from '../pages/ArtworksPage';
import { AddArtworkPage } from '../pages/AddArtworkPage';
import { ArtworkDetailsPage } from '../pages/ArtWorkDetailsPage';


export  class PageManager {
    private  readonly page:Page
    private readonly homePage:HomePage
    private readonly loginPage:LoginPage
    private readonly dashboardPage:DashboardPage
    private readonly artworksPage:ArtworksPage
    private readonly addArtworkPage:AddArtworkPage
    private readonly artworkDetailsPage:ArtworkDetailsPage

    constructor(page:Page) {
        this.page = page
        this.homePage = new HomePage(this.page)
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.artworksPage = new ArtworksPage(this.page)
        this.addArtworkPage = new AddArtworkPage(this.page)
        this.artworkDetailsPage = new ArtworkDetailsPage(this.page)
    }


    onHomePage(){
        return this.homePage
    }

    onLoginPage(){
        return this.loginPage
    }

    onDashboardPage(){
        return this.dashboardPage
    }

    onArtWorksPage(){
        return this.artworksPage
    }

    onAddArtWorkPage(){
        return this.addArtworkPage
    }

    onArtWorkDetailsPage(){
        return this.artworkDetailsPage
    }
}
