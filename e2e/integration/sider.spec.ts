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

    describe('New page creation', () => {
        afterEach(() => {
            cy.get('.sider__menu-item_selected .ant-dropdown-trigger').click();
            cy.get('.ant-dropdown-menu-item').contains('Delete').click();
        });

        it('should be possible to create new page', () => {
            cy.dataCy('sider-new-page-button').should('exist');
            cy.dataCy('sider-new-page-button').click();
            cy.get('.sider__menu-item_selected').should(
                'contain.text',
                NEW_PAGE_TITLE
            );
        });
    });

    describe('New page deletion', () => {
        beforeEach(() => {
            cy.dataCy('sider-new-page-button').click();
        });

        it('should be possible to delete new page', () => {
            cy.dataCy('sider').should('contain.text', NEW_PAGE_TITLE);
            cy.get('.sider__menu-item_selected .ant-dropdown-trigger').click();
            cy.get('.ant-dropdown-menu-item').contains('Delete').click();
            cy.get('.sider__menu-item_selected').should(
                'not.contain.text',
                NEW_PAGE_TITLE
            );
        });
    });
});
