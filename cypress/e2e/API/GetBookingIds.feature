Feature: Getting bookings

  Scenario: Getting booking list from https://restful-booker.herokuapp.com
    Given the API endpoint is Alive:
    When I send a GET request to "/booking"
    Then the response status should be 200
    And the response should have a "bookingid" property with id