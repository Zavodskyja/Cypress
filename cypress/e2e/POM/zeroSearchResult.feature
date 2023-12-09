Feature: Carousel

  Scenario: Carousel is displayed on zero search results
    Given I use global keyword search
    When No results are returned
    Then Zero search results carousel is displayed
    And Contains lots
 