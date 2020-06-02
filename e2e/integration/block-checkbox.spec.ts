/// <reference path="../support/index.d.ts" />

const CHECKBOX_BLOCK_TEXT = '974c09c7-a72e-4664-b9cc-76244ca3f62c';

describe('Checkbox block', () => {
    before(() => {
        cy.visit('/');
        cy.dataCy('empty-page').click();
    });

    it('should create checkbox block on typing []', () => {
        cy.dataCy('text-block').type('[] ');
        cy.dataCy('checkbox-block').should('exist');
    });

    it('should allow to type something', () => {
        cy.dataCy('checkbox-block').type(CHECKBOX_BLOCK_TEXT);
        cy.dataCy('checkbox-block').should('contain.html', CHECKBOX_BLOCK_TEXT);
    });

    it('should allow to clear input', () => {
        cy.dataCy('checkbox-block', '', '.block-component__title').clear();
    });

    it('should change checkbox to text input when deleting empty checkbox', () => {
        cy.dataCy('checkbox-block', '', '.block-component__title').clear();
        cy.dataCy('text-block').should('exist');
    });

    it('should allow to press enter and create new checkbox', () => {
        cy.dataCy('text-block').type('[] ');
        cy.dataCy('checkbox-block').type('Level 1{enter}');
        cy.dataCy('checkbox-block').should('have.length', 2);
        cy.dataCy('checkbox-block', ':last').type('Level 2');
    });

    it('should allow to create nested checkboxes', () => {
        cy.dataCy('checkbox-block', ':last').typeTab();
        cy.dataCy('checkbox-block').dataCy('checkbox-block').should('exist');
    });

    it.skip('should allow to unnest checkbox', () => {
        cy.dataCy('checkbox-block', ':last').typeTab(true);
        cy.dataCy('checkbox-block').dataCy('checkbox-block').should('not.exist');
    })
});
