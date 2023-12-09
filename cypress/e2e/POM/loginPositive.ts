import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const login = "asd";
const password = "asd";

      Given('I have valid credentials and Im on homepage', () => {


            cy.visit("staging.christies.com") // pridat jako ENV pozdeji
            
           
      });
      
      When('I click Sign in', () => {
        // optat se na reseni
       // cy.get('body > div:nth-child(4) > chr-header > header > div.chr-header__panel.chr-header__panel--top > div > div > div > chr-button > button').should('exist').click();
        cy.get('.chr-header__user-zone').contains('Sign in').should('exist').click();


      });
      
      Then('Sign in window is opened', () => {
            
        cy.get('[class=chr-modal-login').should('be.visible')

            
      });

      Then('I can sign in', () => {
            
        cy.get('[id$=username]').should('exist').type(login);
        cy.get('[id$=password]').should('exist').type(password);
        cy.wait(1000)
        cy.get('.chr-modal-login').contains('Sign in').should('exist').click();
        
  });
      
