import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";



//let requestBody;



Given('I Have booking ID', () => {
 // TODO- Asi udelat command co zalozi booking? .. zatim hardcoded.
});

When('I send a GET request to {string}', (url) => {
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}${url}`,
      headers: {
        Accept: 'application/json',
      },
    }).as('postResponse');
  });

Then('the response status should be {int}', (status) => {
  cy.get('@postResponse').its('status').should('eq', status);
});

Then('the response should have a booking details for id', () => {
  cy.request('/booking/1').then((response) => {
        //TODO - Tento test udelat az po create
    //expect(response.status).to.eq(200)
    expect(response.body).to.deep.equal({
        firstname: 'Jan',
        lastname: 'Test',
        totalprice: 106,
        depositpaid: true,
        bookingdates: {
          checkin: '2023-10-10',
          checkout: '2024-11-11',
        }
        //additionalneeds: 'Pikachu polstar',
      });
  });
});