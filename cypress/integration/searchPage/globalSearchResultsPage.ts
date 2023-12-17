import { HomePage } from "../homePage/homepage";

export class GlobalSearchResultsPage {
private homePage: HomePage;

  
    open() {
      cy.visit(`${Cypress.env('productUrl')}/search`);
      //Mozna pridat nejaky wait/get pro nacteni stranky ? 
    };

    keywordSearch(keyword: string){
        cy.get('[id$=site-search]').should('exist').type(keyword);
        cy.get('body > div:nth-child(4) > chr-header > header > div:nth-child(2) > div > div > div.chr-header__panel-content-right > chr-autocomplete-input > form > div > chr-button > button').should('exist').click();
    }


    searchHeader(keyword: string){
        cy.get('body > main > div:nth-child(7) > chr-search-results > section > div > chr-search-header > header > h1').should('be.visible').and('contain.text', 'Showing results for');
        cy.get('body > main > div:nth-child(7) > chr-search-results > section > div > chr-search-header > header > h1 > span').should('be.visible').and('contain.text', `“${keyword}”`);
    }

    results(){
        cy.get('[data-qa=search-result-tiles]').should('exist');
    }

    zeroSearchResults(keyword: string){
        cy.get('#tabpanel-available_lots > chr-search-lots-view > section > div > div:nth-child(3) > div > h2').should('be.visible').and('contain.text', `No available items for “${keyword}”`);
    }

    zeroSearchCarousel(){
        // mozna zkusit pres .children pozdeji
        cy.get('[data-namespace=searchLotCarousel]').should('be.visible');
        cy.get('[class=glide__slides]').find('.chr-lot-tile-carousel-wrapper.hydrated, .chr-lot-tile-carousel-wrapper.hydrated.glide__slide--active')
        .should('have.length', 10);
    }

    filterSearchResults(){

    }

    followLot(){
        //Provizorni test reseni + bude asi padat na chybu u Online lots
        const login = "aaa@yopmail.com";
        const password = "Qwer1234";
        
        this.homePage = new HomePage();

        this.homePage.clickSignIn().loginPositive(login, password)
        cy.wait(5000) 
        cy.get('#newFocusableLotItem > div.chr-lot-tile__dynamic-section > div > div.chr-lot-tile__buttons > div > chr-button-save-lot > chr-button > button').should('exist').and('contain.text','Follow').click();
        cy.get('#newFocusableLotItem > div.chr-lot-tile__dynamic-section > div > div.chr-lot-tile__buttons',{ timeout: 10000 }).first().should('exist').click().should('contain.text','Following');
        
       /*
        cy.get('#newFocusableLotItem > div.chr-lot-tile__dynamic-section > div > div.chr-lot-tile__buttons > div > chr-button-save-lot > chr-button > button')
        .should('exist')
        .then(($button) => {
          if ($button.text().includes('Follow')) {
            cy.wrap($button).click();
            cy.get('#newFocusableLotItem > div.chr-lot-tile__dynamic-section > div > div.chr-lot-tile__buttons',{ timeout: 5000 }).first().should('exist').click().should('contain.text', 'Following');
          } 
          
          else if(($button.text().includes('Following'))) {
            cy.wrap($button).click();
            cy.get('#newFocusableLotItem > div.chr-lot-tile__dynamic-section > div > div.chr-lot-tile__buttons',{ timeout: 5000 }).first().should('exist').click().should('contain.text', 'Follow');
          }
        });
        */

    }
}
