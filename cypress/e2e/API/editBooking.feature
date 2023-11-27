Feature: Edit an existing booking

  Scenario: User edits an existing booking
    Given User is authenticated:

    When User creates a booking:
      """
      {
        "firstname": "Jan",
        "lastname": "Test",
        "totalprice": 456,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2023-10-10",
          "checkout": "2024-11-11"
        },
        "additionalneeds": "Pikachu polstar"
      }
      """
    And the response status code should be 200
    And the ID of "bookingid" is created and should be a number
Then User can edit the existing booking:

    And the response status code should be 200
    And the response body should contain the new properties:
      """
      {
         "firstname": "Petr",
         "lastname": "Edit",
         "totalprice": 123,
         "depositpaid": false,
         "bookingdates": {
          "checkin": "2024-01-02",
          "checkout": "2025-03-04"
        },
        "additionalneeds": "Bulbasaur lampa"
      }
      """
