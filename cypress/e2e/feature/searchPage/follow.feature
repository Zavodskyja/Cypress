Feature: Follow

  Scenario: User can follow lots
    Given I am logged in and on GSRP
    When I follow lot
    Then Lot is displayed as followed