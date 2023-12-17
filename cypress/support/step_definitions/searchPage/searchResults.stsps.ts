import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GlobalSearchResultsPage } from "../../../integration/searchPage/globalSearchResultsPage"; 


const searchPage = new GlobalSearchResultsPage();
const keyword = "gold";

Given('Im on search page', () => {
    searchPage.open();
});

When('I enter valid keyword', () => {
  searchPage.keywordSearch(keyword);
});


Then('I receive results', () => {
  searchPage.results();
});

Then('Heading containst keyword',() => {
  searchPage.searchHeader(keyword);
})



