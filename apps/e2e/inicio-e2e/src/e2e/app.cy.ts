describe('inicio-e2e', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve exibir título, input e botão desativado inicialmente', () => {
    cy.contains('Olá, seja bem-vindo!');
    cy.get('input[placeholder="Digite o seu nome:"]').should('exist');
    cy.get('button').contains('Entrar').should('be.disabled');
  });

  it('deve permitir digitar nome, habilitar botão e redirecionar para /dashboard', () => {
    cy.get('input[placeholder="Digite o seu nome:"]').type('João');

    cy.get('button').contains('Entrar').should('not.be.disabled').click();

    cy.url().should('include', '/dashboard');
  });
});
