/* eslint-disable no-undef */

describe('tests navbar', () => {
  it('has a navbar with correct elements/links', () => {
    const db = Cypress.env('db');

    cy.visit('http://localhost:3001/');
    cy.get('.allContent').should('exist');
    cy.get('#loginButton').should('exist').click();
    cy.get('.emailSection').should('exist');
    cy.get('.passwordSection').should('exist');

    cy.get('[id="loginEmailInput"]').type('firstuser@hotmail.com');
    cy.get('[id="loginPasswordInput"]').type('password');
    cy.get('#loginNowButton').should('exist').click();
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get('#swal2-html-container').then((message) => {
      const text = message.text();
  
      // eslint-disable-next-line jest/valid-expect
      expect(text).to.eq('You are now logged in! You will be redirected to the homepage');
    });

  });
})
