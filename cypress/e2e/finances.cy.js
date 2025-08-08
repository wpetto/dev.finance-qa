describe ('Funcionalidade de Transações' , () => {
    beforeEach(() => {
      cy.visit('/')
    })

    afterEach(() => {
      cy.screenshot()
    });

    it ('Cadastrar uma entrada' , () => {
      //Action
      criarTransação ('Pagamento de Salário' , 3520)
      //Assert
      cy.get('tbody tr td.description').should('have.text','Pagamento de Salário')
    })

    it ('Cadastrar uma saída' , () => {
      criarTransação ('Conta de Água' , -120)

      cy.get('tbody tr td.description').should('have.text','Conta de Água')
    })

    it ('Excluir transação' , () => {
      criarTransação ('Conta de Água' , -120)

     /*cy.contains('.description', 'Conta de Água').parents('tbody tr')
          .find('img').click() */ 
      cy.contains('.description','Conta de Água')
        .siblings().children('img').click()
    })
})

function criarTransação (descrição, valor) {
    cy.get('#transaction .button').click()
    cy.get('#form #description').type(descrição)
    cy.get('#form #amount').type(valor)
    cy.get('#form #date').type('2025-02-05') //yyyy-mm-dd

    cy.contains('Salvar').click()
}