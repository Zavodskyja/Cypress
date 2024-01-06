
/*
cypress docs: https://docs.cypress.io/api/commands/focused
chrome: https://stackoverflow.com/questions/51385378/can-chrome-devtools-track-element-with-focus
*/



export class ArtistPage {
    carousel = '.chr-scrolling-carousel'
    artistH1 = 'body > main > section.container-fluid.text-align-center.py-5 > div > div:nth-child(1) > h1'

   
  
    open() {
        cy.visit(`${Cypress.env('productUrl')}/en/artists`);
        cy.get(this.artistH1).should('be.visible').and('contain.text', 'Featured artists and makers')
    }
  
    carouselExists() {
      cy.get(this.carousel).should('exist')
        //mozna pridat kontrolu odkazu
      const carouselItems = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ];
  
      carouselItems.forEach((text, index) => {
        cy.get(`.chr-scrolling-carousel > div.chr-scrolling-carousel__content > li:nth-child(${index + 1})`).should('contain.text', text);
       
      });
    }

    clickLetter()
    {
        cy.get('.chr-scrolling-carousel > div.chr-scrolling-carousel__content > li > chr-button > a:contains("P")').click();
    }


    clickedLetterFocus()
    {
        cy.get('[data-id="P"]').should('have.focus');
    }

    artistClick(){
    /* poresit proc pada na 
    <script>
        window.chrComponents = window.chrComponents || {};
        window.chrComponents.tags_lpHeader = ;
    </script>
    Optat se Ondry + potom odstranit workaround potlacenim erroru
    */

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
          })

        cy.get('body > main > section.chr-section.pt-5.mb-12 > div > div.chr-artist-listing > section > div.chr-artist-listing__content > div > div > ol > li > a:contains("Pablo Picasso")')
        .should('exist').click();
        //cy.wait(10000);
        cy.url().should('eq',`${Cypress.env('productUrl')}/en/artists/pablo-picasso?lotavailability=All&sortby=relevance`)
        cy.get('body > main > section > div > div > div:nth-child(1) > div > div > h1').should('exist').and('contain.text', 'Pablo Picasso');
    }
    }