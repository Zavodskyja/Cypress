
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { bookingApi } from "../../support/responseHelper";


let response;
let requestBody;
let authToken;
let createdId;
let responseEdit;

Given('User is authenticated:', () => {
  //pridat HealthCheck z https://restful-booker.herokuapp.com/apidoc/index.html#api-Ping-Ping
  requestBody = {
    username: Cypress.env('login'),
    password: Cypress.env('loginPassword')
  };

  bookingApi.post(`${Cypress.config('baseUrl')}${'/auth'}`,requestBody)
  .then((response) => {
    authToken = response.body.token;
    expect(response.status).to.eq(200);
  });
});

When('User creates a booking:', () => {
  //requestBody = JSON.parse(data); -- Pouzit jednu z moznosti.
  cy.fixture('bookingData').then((bookingData) => {
  bookingApi.post(`${Cypress.config('baseUrl')}${'/booking'}`,bookingData)
    .then((res) => {
      response = res;
      createdId = res.body.bookingid
      expect(response.status).to.eq(200);
    });
});
});


Then('the ID of {string} is created and should be a number', () => {
    expect(response.body.bookingid).to.be.a('number');
  });


Then('User can edit the existing booking:', () => {
    //requestBody = JSON.parse(data); -- Pouzit jednu z moznosti.
    cy.fixture('bookingEdit').then((bookingEdit) => {
    
      bookingApi.put(`${Cypress.config('baseUrl')}${'/booking/'}${createdId}`,bookingEdit,{'Content-Type':'application/json','Cookie':'token='+authToken})
      .then((res) => {
        response = res;
        responseEdit=res;
        //createdId = res.body.bookingid
        expect(response.status).to.eq(200);
      });

    /*  cy.request({
      method: 'PUT',
      url: `${Cypress.config('baseUrl')}${'/booking/'}${createdId}` ,
      headers: {
        'Content-Type': 'application/json',
        'Cookie':'token='+authToken
      },
      body: bookingEdit,
    }).then((res) => {
      responseEdit = res;
    });*/
  });
  });


Then('the response status code should be {int}', (statusCode: number) => {
    expect(response.status).to.eq(statusCode);
  });
  
Then('the response body should contain new data:', (expectedBody: string) => {
    const expected = JSON.parse(expectedBody);
    console.log('Response Body:', response.body);
    console.log('Expected:', expected);
    expect(responseEdit.body).to.deep.equal(expected);
  });


  
