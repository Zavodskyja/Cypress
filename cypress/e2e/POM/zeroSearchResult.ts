import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";



      Given('I use global keyword search', () => {
           
            cy.visit("staging.christies.com")
            cy.get('[id=site-search]').type("hjhasdjkhasdasd")
            cy.get('body > div:nth-child(4) > chr-header > header > div:nth-child(2) > div > div > div.chr-header__panel-content-right > chr-autocomplete-input > form > div > chr-button > button').click();

            
           
      });
      
      When('No results are returned', () => {
       cy.get('[id$=iSignUp]',{ timeout: 25000 }).should('be.visible').should('be.visible')
       cy.get('[id$=close_signup]').should('be.visible').click()

      });
      
      Then('Zero search results carousel is displayed', () => {
            
            
            
      });

      Then('Contains lots', () => {
            
       
        
  });
      

 