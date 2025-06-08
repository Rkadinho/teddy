describe('dashboard-e2e', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('deve exibir lista de clientes', () => {
    cy.get('.grid lib-teddy-card').should('have.length.greaterThan', 0);

    cy.get('.clientesTexto p strong').invoke('text').then((text) => {
      const totalClientes = parseInt(text);
      expect(totalClientes).to.be.greaterThan(0);
    });
  });

  it('deve permitir mudar clientes por página e atualizar a lista', () => {
   cy.get('input[type="text"]').then(input => {
      input.val('5').trigger('change');
    });

    cy.get('lib-teddy-card').should('have.length.at.most', 5);
  });

  it('deve abrir modal criar cliente ao clicar no botão', () => {
    cy.get('lib-teddy-botao').contains('Criar cliente').click();

    cy.get('lib-teddy-modal').should('exist');
    cy.get('lib-teddy-modal').contains('Criar cliente:');
  });

  it('deve abrir modal editar cliente ao clicar no evento editar de um card', () => {
    cy.get('lib-teddy-card').first().within(() => {
      cy.get('img[alt="Editar cliente"]').click();
    });

    cy.get('lib-teddy-modal').should('exist').within(() => {
      cy.contains('Editar cliente:').should('exist');
    });
  });

  it('deve abrir modal excluir cliente ao clicar no evento excluir de um card', () => {
    cy.get('lib-teddy-card').first().within(() => {
      cy.get('img[alt="Excluir cliente"]').click({ force: true });
    });

    cy.get('lib-teddy-modal-excluir', { timeout: 10000 }).should('exist');
    cy.get('lib-teddy-modal-excluir').contains('Excluir cliente:').should('exist');
  });

  it('deve navegar entre páginas ao clicar nos botões da paginação', () => {
    cy.get('body').then($body => {
      const paginationExists = $body.find('.paginacao .botaoPaginacao').length > 0;

      if (paginationExists) {
        cy.get('.paginacao .botaoPaginacao').eq(1).click();
        cy.get('lib-teddy-card').should('exist');
      } else {
        cy.log('Paginação não visível: verifique se há clientes suficientes');
      }
    });
  });
});

