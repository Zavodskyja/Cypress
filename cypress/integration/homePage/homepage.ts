export class HomePage {


  errorMessage = "The email address and password that you entered did not match our records. Please double-check and try again, or contact Client Services for further assistance.";

  open() {
    cy.visit(`${Cypress.env('productUrl')}`);
  }

  clickSignIn() {
    cy.get('.chr-header__user-zone').contains('Sign in').should('exist').click();
    return new HomePage();
  }

  isSignInWindowOpened() {
    cy.get('[class=chr-modal-login]').should('be.visible');
  }

/*
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
*/
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
/*
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

*/
  login(username: string, password: string, loginState: string) {
    const loginAPI = "https://dw-uat-auth.christies.com/auth/api/v1/login";
    cy.intercept("POST", loginAPI).as("getLogin");
    cy.get('[id$=username]').should('exist').type(username);
    cy.wait(2000);
    cy.get('[id$=password]').should('exist').type(password);
    cy.get('.chr-modal-login chr-button', { timeout: 10000 }).contains('Sign in').click();
    if(loginState=='valid'){
      cy.wait('@getLogin').then((interception) => {
        const responseBody = interception.response.body;
        expect(responseBody.auth_successful).to.be.true;
      });
    }
    else if(loginState=='invalid'){
      cy.wait('@getLogin').then((interception) => {
        const responseBody = interception.response.body;
        expect(responseBody.auth_successful).to.be.false;
        cy.get('.content-zone.chr-label.chr-color-red-alert', { timeout: 10000 }).should((message) => {
          expect(message.text()).to.equal(this.errorMessage);
        });
      });
    }
    return new HomePage();
  }

  myAccount(){
    cy.get('.chr-header__user-zone',{timeout:15000}).contains('My account').should('exist');
  }



  logout(){
    const logoutAPI = "https://dw-uat-auth.christies.com/auth/api/v1/logout";
    cy.intercept("POST", logoutAPI).as("logOut");
    cy.get('.chr-header__user-zone',{timeout:15000}).contains('Log out').should('exist').click();
    cy.wait('@logOut').then((interception) => {
      const responseBody = interception.response.statusCode;
      expect(responseBody).to.equal(200);
    });
  }

}


