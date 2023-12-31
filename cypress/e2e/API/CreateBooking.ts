
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


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

When('the user makes a POST request with the following data to {string}:', (url) => {
  //requestBody = JSON.parse(data); -- Pouzit jednu z moznosti.
  cy.fixture('bookingData').then((bookingData) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}${url}`,  //Druha varianta
    headers: {
      'Content-Type': 'application/json',
    },
    body: bookingData,
  }).then((res) => {
    response = res;
  });
});
});


Then('the response status code should be {int}', (statusCode: number) => {
    expect(response.status).to.eq(statusCode);
  });

Then('the ID of "bookingid" should be a number', () => {
    expect(response.body.bookingid).to.be.a('number');
  });
Then('the response body should contain a property "bookingid"', () => {
    expect(response.body).to.include.keys('bookingid');
  });
  
Then('the response body should contain the following properties:', (expectedBody: string) => {
    const expected = JSON.parse(expectedBody);
    expect(response.body.booking).to.deep.equal(expected.booking);
  });


  
