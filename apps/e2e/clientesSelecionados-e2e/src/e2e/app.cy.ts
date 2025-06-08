describe('clientesSelecionados-e2e', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'clientesSelecionados',
      JSON.stringify([
        { id: 1, name: 'Cliente 1', salary: 1000, companyValuation: 5000 },
        { id: 2, name: 'Cliente 2', salary: 2000, companyValuation: 7000 },
      ])
    );
    cy.visit('/clientesSelecionados');
  });

  it('deve exibir clientes selecionados se houver no cache', () => {
    cy.contains('Clientes selecionados:').should('exist');
    cy.get('lib-teddy-card').should('have.length', 2);
    cy.contains('Cliente 1').should('exist');
    cy.contains('Cliente 2').should('exist');
  });

  it('deve remover todos os clientes ao clicar em "Limpar clientes selecionados"', () => {
    cy.get('lib-teddy-botao').contains('Limpar clientes selecionados').click();
    cy.contains('Nenhum cliente selecionado').should('exist');
    cy.get('lib-teddy-card').should('not.exist');
  });

  it('deve remover cliente individual ao clicar no botão de limpar de um card', () => {
    cy.get('lib-teddy-card').first().within(() => {
      cy.get('img[alt="limpar cliente selecionado"]').click();
    });
    cy.get('lib-teddy-card').should('have.length', 1);
  });
});
