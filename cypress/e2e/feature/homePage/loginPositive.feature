Feature: Login

  Scenario: User can login with correct credentials
    Given I have valid credentials and Im on homepage
    When I click on Sign in
    Then Sign in window is present
    And I can sign in
    And I can sign out