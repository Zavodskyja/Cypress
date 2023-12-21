import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GlobalSearchResultsPage } from "../../integration/searchPage/globalSearchResultsPage"; 


const searchPage = new GlobalSearchResultsPage();
const keyword = "hasdasdkjhakjsdhasd";



Given('I use global keyword search', () => {
      searchPage.open()
      searchPage.keywordSearch(keyword);

      /*
      Druha moznost zapisu
      searchPage.open() && searchPage.keywordSearch(keyword));
      */
});
      
When('No results are returned', () => {
      searchPage.searchHeader(keyword);
      searchPage.zeroSearchResults(keyword);
});
      
Then('Zero search results carousel is displayed', () => {
      searchPage.zeroSearchCarousel();
});


 