import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
//import { config } from "cypress/types/bluebird";


let requestBody;



Given('Service is Alive', () => {

});

When('I send a GET request to {string}', (url) => {
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}${url}`,
      body: requestBody,
    }).as('postResponse');
  });

Then('the response status should be {int}', (status) => {
  cy.get('@postResponse').its('status').should('eq', status);
});

Then('the response should have a "bookingid" property with id', () => {
  cy.request('/booking').then((response) => {
  
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('array');
    //Overit zda neco vrati -- pouzit pri vlastnim bookingu 
    expect(response.body).to.have.length.of.at.least(1);
   
    response.body.forEach((booking) => {
      expect(booking).to.have.property('bookingid');
    });
  });
});