import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../../integration/homePage/homepage"; 

const login= Cypress.env('stagingLogin');
const password= Cypress.env('stagingPassword')

const homePage = new HomePage();

Given('I have valid credentials and Im on homepage', () => {
  homePage.open();
});

When('I click on Sign in', () => {
  homePage.clickSignIn();
});

Then('Sign in window is present', () => {
  homePage.isSignInWindowOpened();
});

Then('I can sign in', () => {
  homePage.login(login, password, 'positive');
});

Then('I can sign out', () => {
   homePage.logout();
  });