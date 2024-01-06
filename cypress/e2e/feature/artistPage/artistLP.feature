Feature: Artist page

  Scenario: Artist page focus and artist links work properly
    Given Im on Artist page
    When alphabet carousel is displayed
    And I click on letter
    Then Focus is on said alphabet section
    And Artists are displayed and I can select one