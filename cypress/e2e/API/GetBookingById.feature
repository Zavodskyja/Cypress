Feature: Getting booking by ID

  Scenario: Getting booking details for booking ID from https://restful-booker.herokuapp.com
    Given I Have booking ID
    When I send a GET request to "/booking/1" 
    Then the response status should be 200
    And the response should have a booking details for id