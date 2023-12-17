import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GlobalSearchResultsPage } from "../../../integration/searchPage/globalSearchResultsPage"; 


const searchPage = new GlobalSearchResultsPage();
const keyword = "REF. 2523/1, MANUFACTURED IN 1965";

Given('I am logged in and on GSRP', () => {
    searchPage.open();
});

When('I follow lot', () => {
  searchPage.keywordSearch(keyword);
});


Then('Lot is displayed as followed', () => {
  //searchPage.results();
  searchPage.followLot();
});
