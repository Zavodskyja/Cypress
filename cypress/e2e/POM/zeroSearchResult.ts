import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";



      Given('I use global keyword search', () => {
           
            cy.visit(`${Cypress.env('productUrl')}`)
            cy.get('[id=site-search]').type("hjhasdjkhasdasd")
            cy.get('body > div:nth-child(4) > chr-header > header > div:nth-child(2) > div > div > div.chr-header__panel-content-right > chr-autocomplete-input > form > div > chr-button > button').click();

            
           
      });
      
      When('No results are returned', () => {
  

      });
      
      Then('Zero search results carousel is displayed', () => {
            
            
            
      });

      Then('Contains lots', () => {
            
       
        
  });
      

 