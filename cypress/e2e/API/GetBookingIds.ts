import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";



let requestBody;
let response: any;



Given('Service is Alive', () => {
 //pridat HealthCheck z https://restful-booker.herokuapp.com/apidoc/index.html#api-Ping-Ping
});

When('I send a GET request to {string}', (url) => {
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}${url}`,
      body: requestBody,
    }).then((res) => {
      response = res;
    });
  });

Then('the response status should be {int}', (status) => {
  //cy.get('@postResponse').its('status').should('eq', status);
  expect(response.status).to.eq(status);
});

Then('the response should have a "bookingid" property with id', () => {
  /*
  Mozna pouzit tuhle variantu kvuli rychlejsimu behu namisto ciste response?
  cy.request('/booking').then((response) => {
  */
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('array');
    //Overit zda neco vrati -- pouzit pri vlastnim bookingu 
    expect(response.body).to.have.length.of.at.least(1);
   
    response.body.forEach((booking) => {
      expect(booking).to.have.property('bookingid');
    //});
  });
});