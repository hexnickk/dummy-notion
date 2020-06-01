/// <reference path="../support/index.d.ts" />

describe('Empty block', () => {
    before(() => {
        cy.visit('/');
    });

    it('should be empty by default', () => {
        cy.dataCy('empty-page').should('exist');
    });

    it('should create text block on click', () => {
        cy.dataCy('empty-page').click();
        cy.dataCy('text-block').should('exist');
    });

    it('should return empty block when deleting text block', () => {
        cy.dataCy('text-block', '', 'input').clear();
        cy.dataCy('text-block').should('not.exist');
        cy.dataCy('empty-page').should('exist');
    });
});
