export class GlobalSearchResultsPage {

  
    open() {
      cy.visit(`${Cypress.env('productUrl')}/search`);
    };

    keywordSearch(keyword: string){
        cy.get('[id$=site-search]').should('exist').type(keyword)
        cy.get('body > div:nth-child(4) > chr-header > header > div:nth-child(2) > div > div > div.chr-header__panel-content-right > chr-autocomplete-input > form > div > chr-button > button').should('exist').click()
    }


    searchHeader(keyword: string){
        cy.get('body > main > div:nth-child(7) > chr-search-results > section > div > chr-search-header > header > h1').should('be.visible').and('contain.text', 'Showing results for');
        cy.get('body > main > div:nth-child(7) > chr-search-results > section > div > chr-search-header > header > h1 > span').should('be.visible').and('contain.text', `“${keyword}”`);
    }

    results(){
        cy.get('[data-qa=search-result-tiles]').should('exist')
    }

    zeroSearchResults(keyword: string){
        cy.get('#tabpanel-available_lots > chr-search-lots-view > section > div > div:nth-child(3) > div > h2').should('be.visible').and('contain.text', `No available items for “${keyword}”`)
    }

    zeroSearchCarousel(){
        // mozna zkusit pres .children pozdeji
        cy.get('[data-namespace=searchLotCarousel]').should('be.visible')
        cy.get('[class=glide__slides]').find('.chr-lot-tile-carousel-wrapper.hydrated, .chr-lot-tile-carousel-wrapper.hydrated.glide__slide--active')
        .should('have.length', 10);
    }
}


