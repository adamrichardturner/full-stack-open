describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Adam Turner',
      username: 'aturner',
      password: 'Matrix88'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('aturner')
      cy.get('#password').type('Matrix88')
      cy.get('#login-button').click()
      cy.get('.notification')
        .should('contain', 'logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('atooona')
      cy.get('#password').type('Mapbox88')
      cy.get('#login-button').click()
      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('aturner')
      cy.get('#password').type('Matrix88')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('.toggle-button').click()
      cy.get('#title').type('A test blog')
      cy.get('#author').type('Edgar Allan Poe')
      cy.get('#url').type('www.example.com')
      cy.get('#add-blog').click()
      cy.contains('A test blog')
    })
  })
})