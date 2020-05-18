/// <reference path="../support/index.d.ts" />

const DEFAULT_PAGE_TITLE = 'First page';
const NEW_PAGE_TITLE = 'New page';

describe('Sider', () => {
    before(() => {
        cy.visit('/');
    });

    it('should exist', () => {
        cy.dataCy('sider').should('exist');
    });

    it('should have default page', () => {
        cy.dataCy('sider').contains(DEFAULT_PAGE_TITLE);
    });

    it('should be possible to create new page', () => {
        cy.dataCy('sider-new-page-button').should('exist');
        cy.dataCy('sider-new-page-button').click();
        cy.dataCy('sider').contains(NEW_PAGE_TITLE);
    });
});
