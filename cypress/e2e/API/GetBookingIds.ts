import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {validateBookingIDResponse} from "../../fixtures/schemas/booking"





let requestBody;
let response: any;



Given('the API endpoint is Alive:', () => {
  //pridat HealthCheck z https://restful-booker.herokuapp.com/apidoc/index.html#api-Ping-Ping
  cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrl')}${'/ping'}`,
  }).then((isAlive) => {
    expect(isAlive.status).to.eq(201)
    expect(isAlive.statusText).to.eq("Created");
    
  });
})

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
    expect(validateBookingIDResponse(response.body)).to.be.true;

    /*Tohle asi ne, zabiji to perf
    response.body.forEach((booking) => {
      expect(booking).to.have.property('bookingid');
      
    //});*
  });*/
});