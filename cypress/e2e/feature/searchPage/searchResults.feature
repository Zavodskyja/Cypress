Feature: Search results

  Scenario: Search results are returned
    Given Im on search page
    When I enter valid keyword
    Then I receive results
    And Heading containst keyword