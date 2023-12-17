export class HomePage {

  open() {
    cy.visit(`${Cypress.env('productUrl')}`);
  }

  clickSignIn() {
    cy.get('.chr-header__user-zone').contains('Sign in').should('exist').click();
  }

  isSignInWindowOpened() {
    cy.get('[class=chr-modal-login]').should('be.visible');
  }
//TODO - uprava funkce na valid/invalid login
  login(username: string, password: string, errorMessage: string) {
    const loginAPI = "https://dw-uat-auth.christies.com/auth/api/v1/login";
    cy.intercept("POST", loginAPI).as("getLogin");
    cy.get('[id$=username]').should('exist').type(username);
    cy.wait(2000);
    cy.get('[id$=password]').should('exist').type(password);
    cy.get('.chr-modal-login chr-button', { timeout: 10000 }).contains('Sign in').click();
    cy.wait('@getLogin').then((interception) => {
      const responseBody = interception.response.body;
      expect(responseBody.auth_successful).to.be.false;
      cy.get('.content-zone.chr-label.chr-color-red-alert', { timeout: 10000 }).should((message) => {
        expect(message.text()).to.equal(errorMessage);
      });
    });
  }

  isQuickSignInWindowOpened() {
    cy.get('[id$=iSignUp]',{ timeout: 25000 }).should('be.visible').should('be.visible');
  }

  isQuickSignInWindowClose() {
    cy.get('[id$=close_signup]').should('be.visible').click();
    cy.get('[id$=iSignUp]').should('not.exist');
  }

  headerCheckText(){
    const navItems = [
      'Auctions',
      'Private Sales',
      'Locations',
      'Departments',
      'Stories',
      'Services'
    ];

    navItems.forEach((text, index) => {
      cy.get(`.chr-main-nav__list > li:nth-child(${index + 1})`).should('contain.text', text);
    });
  }

  headerCheckHref(){
    const baseUrl = Cypress.env('productUrl');
    const navItemUrls = [
      '/calendar?mode=1&sc_lang=en&lid=1',
      '/private-sales/whats-on-offer?sc_lang=en&lid=1',
      '/locations?sc_lang=en&lid=1',
      '/departments/index.aspx?sc_lang=en&lid=1',
      '/en/stories?mode=1&lid=1',
      '/en/services'
    ];

    navItemUrls.forEach((expectedUrl, index) => {
      cy.get(`.chr-main-nav__list > li:nth-child(${index + 1}) a`).should('have.attr', 'href').then((href) => {
        expect(href).to.eq(`${baseUrl}${expectedUrl}`);
      });
    });
  }

  loginPositive(username: string, password: string) {
    const loginAPI = "https://dw-uat-auth.christies.com/auth/api/v1/login";
    cy.intercept("POST", loginAPI).as("getLogin");
    cy.get('[id$=username]').should('exist').type(username);
    cy.wait(2000);
    cy.get('[id$=password]').should('exist').type(password);
    cy.get('.chr-modal-login chr-button', { timeout: 10000 }).contains('Sign in').click();
    cy.wait('@getLogin').then((interception) => {
      const responseBody = interception.response.body;
      expect(responseBody.auth_successful).to.be.true;
    });
  }

}


