/// <reference path="../support/index.d.ts" />

const TEXT_BLOCK_TEXT = 'c792b201-886f-438e-8dd5-2b3ac96f1f9c';

describe('Text block', () => {
    before(() => {
        cy.visit('/');
    });

    before(() => {
        cy.dataCy('empty-page').click();
    });

    it('should allow typing', () => {
        cy.dataCy('text-block').type(TEXT_BLOCK_TEXT);
        cy.dataCy('text-block').should('contain.html', TEXT_BLOCK_TEXT);
    });

    it('should allow ctrl+a clearing', () => {
        cy.dataCy('text-block', '', 'input').clear();
        cy.dataCy('text-block').should('exist');
    });

    it('should delete empty block', () => {
        cy.dataCy('text-block', '', 'input').clear();
        cy.dataCy('text-block').should('not.exist');
    });
});
