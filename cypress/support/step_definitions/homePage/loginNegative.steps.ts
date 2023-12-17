import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../../integration/homePage/homepage"; 

const login = "asd@asd.cz";
const password = "asdasd";
const errorMessage = "The email address and password that you entered did not match our records. Please double-check and try again, or contact Client Services for further assistance.";

const homePage = new HomePage();

Given('I have invalid credentials and Im on homepage', () => {
  homePage.open();
});

When('I click Sign in', () => {
  homePage.clickSignIn();
});

Then('Sign in window is opened', () => {
  homePage.isSignInWindowOpened();
});

Then('I can sign in and receive wrong credentials error', () => {
  homePage.login(login, password, errorMessage);

});