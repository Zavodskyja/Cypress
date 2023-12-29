import { HomePage } from "../homePage/homepage";

export class GlobalSearchResultsPage extends HomePage{


  //selectory
  searchBox = 'body > div:nth-child(4) > chr-header > header > div:nth-child(2) > div > div > div.chr-header__panel-content-right > chr-autocomplete-input > form > div > chr-button > button';
  searchH1 = 'body > main > div:nth-child(7) > chr-search-results > section > div > chr-search-header > header > h1';
  searchH1Keyword = 'body > main > div:nth-child(7) > chr-search-results > section > div > chr-search-header > header > h1 > span';
  zeroSearchH2 = '#tabpanel-available_lots > chr-search-lots-view > section > div > div:nth-child(3) > div > h2';
  carouselItem = '.chr-lot-tile-carousel-wrapper.hydrated, .chr-lot-tile-carousel-wrapper.hydrated.glide__slide--active';
  followButton = '#newFocusableLotItem > div.chr-lot-tile__dynamic-section > div > div.chr-lot-tile__buttons > div > chr-button-save-lot > chr-button > button'


  
    open() {
      cy.visit(`${Cypress.env('productUrl')}/search`);
      //Mozna pridat nejaky wait/get pro nacteni stranky ? 
    };

    keywordSearch(keyword: string){
        cy.get('[id$=site-search]').should('exist').type(keyword);
        cy.get(this.searchBox).should('exist').click();
    }


    searchHeader(keyword: string){
        cy.get(this.searchH1,{ timeout: 10000 }).should('be.visible').and('contain.text', 'Showing results for');
        cy.get(this.searchH1Keyword,{ timeout: 10000 }).should('be.visible').and('contain.text', `“${keyword}”`);
    }

    results(){
        cy.get('[data-qa=search-result-tiles]').should('exist');
    }

    zeroSearchResults(keyword: string){
        cy.get(this.zeroSearchH2, { timeout: 10000 }).should('be.visible').and('contain.text', `No available items for “${keyword}”`);
    }

    zeroSearchCarousel(){
        // mozna zkusit pres .children pozdeji
        cy.get('[data-namespace=searchLotCarousel]').should('be.visible');
        cy.get('[class=glide__slides]',{ timeout: 10000 }).find(this.carouselItem)
        .should('have.length', 10);
    }

    filterSearchResults(){

    }

    followLot(login: string, password: string){
        //Provizorni test reseni + bude asi padat na chybu u Online lots

        this.clickSignIn().login(login, password, 'positive')
        
        /*
        cy.get('#newFocusableLotItem > div.chr-lot-tile__dynamic-section > div > div.chr-lot-tile__buttons > div > chr-button-save-lot > chr-button > button').should('exist').and('contain.text','Follow').click();
        cy.get('#newFocusableLotItem > div.chr-lot-tile__dynamic-section > div > div.chr-lot-tile__buttons',{ timeout: 10000 }).first().should('exist').click().should('contain.text','Following');
        */
       cy.wait(10000)
        cy.get(this.followButton,{ timeout: 10000 }).should('be.visible').first()
        .should('exist')
        .then(($btn) => {
            const txt = $btn.text();
            console.log(txt);
          if ($btn.text() == 'Follow') {
            cy.get(this.followButton).first().click().then(($btn2) => {
            const txt2 = $btn2.text();
            expect(txt2).to.eq('Following')
            })
          } 
          
          else if ($btn.text() == 'Following') {
            console.log(txt);
            cy.get(this.followButton).first().click().then(($btn2) => {
            const txt2 = $btn2.text();
            expect(txt2).to.eq('Follow')

            })
            
            //cy.wrap(button,{ timeout: 5000 }).should('exist').and('contain.text', 'Follow');
            //cy.wrap('#newFocusableLotItem > div.chr-lot-tile__dynamic-section > div > div.chr-lot-tile__buttons',{ timeout: 5000 }).should('exist').click().wait(1000).and('contain.text', 'Follow');
          }
        });
    }
}
