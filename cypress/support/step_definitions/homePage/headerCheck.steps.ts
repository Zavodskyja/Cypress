import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../../integration/homePage/homepage"; 


const loginPage = new HomePage();

Given('Im on homepage', () => {
  loginPage.open();
});

When('I have correct number of nav menu items', () => {
  loginPage.headerCheckText();
});

Then('Text and url of each item is correct', () => {
  loginPage.headerCheckHref();
});




