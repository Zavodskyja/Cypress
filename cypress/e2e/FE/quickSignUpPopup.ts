import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";



      Given('Im new user on homepage', () => {
           
            cy.visit(`${Cypress.env('productUrl')}`)
            
           
      });
      
      When('I wait for quick Sign up and close it', () => {
       cy.get('[id$=iSignUp]',{ timeout: 25000 }).should('be.visible').should('be.visible')
       cy.get('[id$=close_signup]').should('be.visible').click()

      });
      
      Then('Sign up is not displayed', () => {
            
            cy.get('[id$=iSignUp]').should('not.exist')
            
      });
      

 
