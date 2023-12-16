export class HomePage {
    private usernameInput = '[id$=username]';
    private passwordInput = '[id$=password]';
    private signInButton = '.chr-modal-login chr-button';

  
    open() {
      cy.visit(`${Cypress.env('productUrl')}`);
    }
  
    clickSignIn() {
      cy.get('.chr-header__user-zone').contains('Sign in').should('exist').click();
    }
  
    isSignInWindowOpened() {
      cy.get('[class=chr-modal-login]').should('be.visible');
    }
  
    login(username: string, password: string, errorMessage: string) {
      const loginAPI = "https://dw-uat-auth.christies.com/auth/api/v1/login";
      cy.intercept("POST", loginAPI).as("getLogin");
      cy.get(this.usernameInput).should('exist').type(username);
      cy.wait(2000);
      cy.get(this.passwordInput).should('exist').type(password);
      cy.get(this.signInButton, { timeout: 10000 }).contains('Sign in').click();
      cy.wait('@getLogin').then((interception) => {
        const responseBody = interception.response.body;
        expect(responseBody.auth_successful).to.be.false;
              cy.get('.content-zone.chr-label.chr-color-red-alert', { timeout: 10000 }).should((message) => {
        expect(message.text()).to.equal(errorMessage);
      });
    }
  
);
    }
  }


