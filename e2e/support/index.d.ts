// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         * @example cy.dataCy('greeting', ':first-child')
         * @example cy.dataCy('greeting', '', 'input')
         */
        dataCy(
            value: string,
            modifier?: string,
            subselector?: string
        ): Chainable<Element>;

        typeTab(shiftKey?: boolean, ctrlKey?: boolean): Chainable<Element>;
    }
}
