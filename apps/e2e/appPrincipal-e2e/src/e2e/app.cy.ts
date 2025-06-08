describe('appPrincipal-e2e', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('deve exibir os menus vertical e horizontal', () => {
    cy.get('app-menu-vertical').should('exist');
    cy.get('app-menu-horizontal').should('exist');
  });

  it('deve mostrar e esconder mensagens toast', () => {
    cy.intercept('PATCH', 'https://boasorte.teddybackoffice.com.br/users/*').as('atualizarCliente');

    cy.get('lib-teddy-card').first().within(() => {
      cy.get('img[alt="Editar cliente"]').click();
    });

    cy.get('lib-teddy-modal').should('exist').within(() => {
      cy.contains('Editar cliente:').should('exist');
      cy.get('button').contains('Salvar').click();
    });

    cy.wait('@atualizarCliente');

    cy.get('lib-teddy-toast', { timeout: 10000 })
      .should('exist')
      .and('contain.text', 'sucesso');

    cy.get('lib-teddy-toast', { timeout: 7000 }).should('not.exist');
  });
});
