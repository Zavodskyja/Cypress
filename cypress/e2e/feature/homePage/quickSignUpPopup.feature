Feature: Quick Sign up popup

  Scenario: Quick Sign up is displayed
    Given Im new user on homepage
    When I wait for quick Sign up to open
    Then Sign up is not displayed
 