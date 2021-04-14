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
/*
* @param {object} param The selector to see if the test subject is on the page.
* @param {string} param.selector The selector to see if the test subject is on the page.
* @param {string=} param.variableName The name of the variable to be added to `this` context.
* @param {boolean=} param.skip Whether or not to call the `this.skip` method in the current block if its not on the page.
* @returns {Cypress.Chainable<any>} The result of a cy.get() query using the provided selector.
*/


function getIfExists ({ selector, variableName, skip = true }) {
 // Access the document object.
 cy.document().then(($document) => {
 // Perform a search query with the selector.
   const documentResult = $document.querySelectorAll(selector)

   // If there is a result, we want to use Cypress.get() to store the cypress result instead of the vanilla js result.
   if (documentResult.length) {
   // Store it as this.<variable> and return the result. It will be accessiblein siblings and descendants.
   // If we want to store the result as a variable.
     if (variableName) {
     // Store it as this.<variable> and return the result. It will be accessiblein siblings and descendants, and via alias in Cypress commands (i.e. cy.get('@variableName')).
       return cy.get(selector)
         .should('exist')
         .as(variableName)
     } else {
       return cy.get(selector)
         .should('exist')
     }
     // If there are no results, end the test early.
   } else if (!documentResult.length && skip) {
   // Log the reason.
     cy.log('Test subject not in DOM, skipping this test.')
       .then(() => {
       // End the test.
         this.skip()
       })
   } else if (!documentResult.length && !skip) {
     return cy.get(selector)
   }
 })
}

Cypress.Commands.add('getIfExists', getIfExists)