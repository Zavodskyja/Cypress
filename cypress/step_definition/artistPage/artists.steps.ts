import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ArtistPage } from "../../integration/artistPage/artistLP"; 


const artistPage = new ArtistPage();

Given('Im on Artist page', () => {
  artistPage.open();
});

When('alphabet carousel is displayed', () => {
 artistPage.carouselExists();
});

Then('I click on letter', () => {
  artistPage.clickLetter();
});

Then('Focus is on said alphabet section', () => {
  artistPage.clickedLetterFocus();
});

Then('Artists are displayed and I can select one', () => {
    artistPage.artistClick();
  });

