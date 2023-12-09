Feature: Login

  Scenario: User can login
    Given I have valid credentials and Im on homepage
    When I click Sign in
    Then Sign in window is opened
    And I can sign in
 