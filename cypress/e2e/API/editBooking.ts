
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


let response: any;
let requestBody: any;
let authToken: any;
let createdId: any;

Given('User is authenticated:', () => {
  //pridat HealthCheck z https://restful-booker.herokuapp.com/apidoc/index.html#api-Ping-Ping
  requestBody = {
    username: Cypress.env('login'),
    password: Cypress.env('loginPassword')
  };
  
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}${'/auth'}`, 
    body: requestBody,
  }).then((response) => {
    // Token pro editaci do budoucna
    authToken = response.body.token;
})
})

When('User creates a booking:', () => {
  //requestBody = JSON.parse(data); -- Pouzit jednu z moznosti.
  cy.fixture('bookingData').then((bookingData) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}${'/booking'}`,
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: bookingData,
  }).then((res) => {
    response = res;
    createdId = res.body.bookingid
  });
});
});

Then('the ID of {string} is created and should be a number', () => {
    expect(response.body.bookingid).to.be.a('number');
  });


Then('User can edit the existing booking:', () => {
    //requestBody = JSON.parse(data); -- Pouzit jednu z moznosti.
    cy.fixture('bookingEdit').then((bookingEdit) => {
    cy.request({
      method: 'PUT',
      url: `${Cypress.config('baseUrl')}${'/booking/'}${createdId}` ,
      headers: {
        'Content-Type': 'application/json',
        'Cookie':'token='+authToken
      },
      body: bookingEdit,
    }).then((res) => {
      response = res;
    });
  });
  });


Then('the response status code should be {int}', (statusCode: number) => {
    expect(response.status).to.eq(statusCode);
  });

  
Then('the response body should contain the new properties:', (expectedBody: string) => {
    const expected = JSON.parse(expectedBody);
    expect(response.body.booking).to.deep.equal(expected.booking);
  });


  
