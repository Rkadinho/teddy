describe('menus-e2e', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('input[placeholder="Digite o seu nome:"]').type('João');
    cy.get('button').contains('Entrar').click();
    cy.url().should('include', '/dashboard');
  });

  it('deve exibir o menu horizontal com nome do usuário', () => {
    cy.contains('Olá, João').should('exist');
    cy.get('.containerIcone .logo').should('exist');
    cy.contains('Clientes').should('exist');
    cy.contains('Clientes selecionados').should('exist');
    cy.contains('Sair').should('exist');
  });

  it('deve alternar o menu ao clicar no ícone', () => {
    cy.get('.iconeMenu').click();
  });

  it('deve limpar os dados e redirecionar ao clicar em sair', () => {
    cy.contains('Sair').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Olá, João').should('not.exist');
  });

    it('deve mostrar o menu vertical aberto inicialmente', () => {
    cy.get('.sidebar').should('be.visible');
    cy.contains('Clientes').should('exist');
    cy.contains('Clientes selecionados').should('exist');
  });

  it('deve fechar o menu quando clicar na seta', () => {
    cy.get('.setaFechar img[alt="fechar"]').click();
    cy.get('.sidebar').should('not.exist');
  });

  it('deve navegar para dashboard ao clicar no link Clientes', () => {
    cy.get('.menu-item').contains('Clientes').click();
    cy.url().should('include', '/dashboard');
  });

  it('deve navegar para clientes selecionados ao clicar no link correspondente', () => {
    cy.get('.menu-item.selecionados').contains('Clientes selecionados').click();
    cy.url().should('include', '/clientesSelecionados');
  });
});

