import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
//import { config } from "cypress/types/bluebird";


let requestBody;
let authToken;
//let login = Cypress.env('login');
//let password = Cypress.env('loginPassword');


Given('I send auth request with username and password', () => {
  requestBody = {
    username: Cypress.env('login'),
    password: Cypress.env('loginPassword')
  };
});

When('I make a POST request to {string}', (url) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}${url}`, 
    body: requestBody,
  }).then((response) => {
    // Token pro editaci do budoucna
    authToken = response.body.token;
    cy.wrap(response).as('postResponse'); 
  });
});

Then('the response status should be {int}', (status) => {
  cy.get('@postResponse').its('status').should('eq', status);
});

Then('the response should have a {string} property', (property) => {
  cy.get('@postResponse').its('body').should('have.property', property);
});