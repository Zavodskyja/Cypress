import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const login = "asd@asd.cz";
const password = "asdasd";
const errorMessage = "The email address and password that you entered did not match our records. Please double-check and try again, or contact Client Services for further assistance."

      Given('I have invalid credentials and Im on homepage', () => {
            cy.visit(`${Cypress.env('productUrl')}`) 
      });
      
      When('I click Sign in', () => {
        cy.get('.chr-header__user-zone').contains('Sign in').should('exist').click();
      });
      
      Then('Sign in window is opened', () => {
        cy.get('[class=chr-modal-login').should('be.visible')
      });

      Then('I can sign in and receive wrong credentials error', () => {
        const loginAPI = "https://dw-uat-auth.christies.com/auth/api/v1/login";
        cy.intercept("POST", loginAPI).as("getLogin")
        cy.get('[id$=username]').should('exist').type(login);
        cy.wait(2000)
        cy.get('[id$=password]').should('exist').type(password);
       // cy.wait(2000)
        cy.get('.chr-modal-login',{ timeout: 10000 }).find('chr-button').contains('Sign in').click();
        cy.wait('@getLogin').then((interception) => {
          const responseBody = interception.response.body;
          expect(responseBody.auth_successful).to.be.false;
        });
        cy.get('.content-zone.chr-label.chr-color-red-alert',{ timeout: 10000 }).should((message) =>
        {
        expect(message.text()).to.equal(errorMessage)
        })
      });
      