Feature: Login

  Scenario: User cant login with wrong credentials
    Given I have invalid credentials and Im on homepage
    When I click Sign in
    Then Sign in window is opened
    And I can sign in and receive wrong credentials error
 