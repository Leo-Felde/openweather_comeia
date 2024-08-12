describe('MainView Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('Deve renderizar a tela com a lista de cidades e detalhe vazio', () => {
    cy.get('#main-view').should('be.visible')
    cy.get('#lista-cidades').should('be.visible')
    cy.get('#cidade-detalhada').should('be.visible')
  })

  it('Deve pesquisar e exibir os dados da cidade', () => {
    cy.get('.btn-add-cidade').click()
    cy.get('input[type="text"]').should('be.visible')

    cy.get('input[type="text"]').type('Curitiba')
    cy.wait(1000)
    cy.get('input[type="text"]').type('{enter}')

    cy.get('#lista-cidades').contains('Curitiba').should('be.visible')

    cy.get('#lista-cidades .card-cidade-resumida').first().click()
    cy.get('#cidade-detalhada').contains('Clima para Curitiba').should('be.visible')
  })
})