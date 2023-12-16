Feature: Nav menu

  Scenario: Nav menu is present and correct
    Given Im on homepage
    When I have correct number of nav menu items
    Then Text and url of each item is correct