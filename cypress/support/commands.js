// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

require('@testing-library/cypress/add-commands')

Cypress.Commands.add("basic", function () {
        
    cy.get('label.chart-title input').type("Cats vs Dogs")
    cy.get('label.x-label input').type("Cats")
    cy.get('label.y-label input').type("Dogs")
        
    cy.get('.x-value-input').type('1');
    cy.get('.y-value-input').type('3');
      
    cy.get("#add-values-btn").click();

    cy.get('.x-value-input').last().type('4');
    cy.get('.y-value-input').last().type('6');
      
})