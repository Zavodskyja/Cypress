Feature: Authenticating a user

  Scenario: Making a successful POST request to https://restful-booker.herokuapp.com
    Given I send auth request with username and password
    When I make a POST request to "/auth"
    Then the response status should be 200
    And the response should have a "token" property