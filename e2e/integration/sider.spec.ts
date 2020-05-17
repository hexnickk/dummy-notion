/// <reference path="../support/index.d.ts" />

const DEFAULT_PAGE_NAME = 'First page';

describe('Sider', () => {
    before(() => {
        cy.visit('/');
    });

    it('have sider', () => {
        cy.dataCy('sider').should('exist');
    });

    it('should have default page', () => {
        cy.dataCy('sider').contains(DEFAULT_PAGE_NAME);
    })
});
