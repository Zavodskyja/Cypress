import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../integration/homePage/homepage"; 


const loginPage = new HomePage();

Given('Im new user on homepage', () => {
  loginPage.open();
});

When('I wait for quick Sign up to open', () => {
  loginPage.isQuickSignInWindowOpened();
});

Then('Sign up is not displayed', () => {
  loginPage.isQuickSignInWindowClose();
});




