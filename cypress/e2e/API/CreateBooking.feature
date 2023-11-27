Feature: Create a new booking

  Scenario: User creates a new booking
    Given the API endpoint is Alive:

    When the user makes a POST request with the following data to "/booking":
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
    Then the response status code should be 200

    And the response body should contain a property "bookingid"
    And the ID of "bookingid" should be a number 
    And the response body should contain the following properties:
      """
      {
        "booking": {
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
      }
      """
