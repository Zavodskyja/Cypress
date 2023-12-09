import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";



      Given('Im new user on homepage', () => {
           
            cy.visit("staging.christies.com") // pridat jako ENV pozdeji
            
           
      });
      
      When('I dont interact with the page to display quick Sign up', () => {
       cy.get('[id$=iSignUp]',{ timeout: 25000 }).should('be.visible').should('be.visible')
       cy.get('[id$=close_signup]').should('be.visible').click()

      });
      
      Then('I can close quick Sign up', () => {
            
            cy.get('[id$=iSignUp]').should('not.exist')
            
      });
      

 
