Cypress.Commands.add('performActionTwice', () => {
  cy.contains('button', 'Add Element').click();
  cy.contains('button', 'Add Element').click();
});

//For Synchronization of non-cy commands
// Cypress.Commands.add('customCommand', () => {
//   return cy.get('button').click();
// });

describe('The Internet Automation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

    it('Add/Remove Elements', () => {
    cy.get('a[href]').eq(2).click()
    cy.performActionTwice();
    cy.contains('button','Delete').click().should('have.length', 0);
  })

  
  it('Checkboxes', () => {
    cy.get('a[href]').eq(6).click()
    cy.get('input').eq(1).uncheck();
    cy.get('input[type]').each((checkbox) => {
      cy.wrap(checkbox).should('not.be.checked');
    });
  })

  it('Disappearing Elements', () => {
    cy.get('a[href]').eq(9).click()
    cy.get('li').eq(3).trigger('mouseover');
    cy.get('li').eq(2).click().get('h1').should('have.text','Not Found');
  })

  it('Dropdown', () => {
    cy.get('a[href]').eq(11).click()
    cy.get('#dropdown').select(1);
    cy.get('#dropdown>option').eq(0).should('be.disabled');
    cy.contains('Option 1').should('be.selected');
  })

  it('Dynamic Controls', () => {
    cy.get('a[href]').eq(13).click()
    cy.get('#checkbox>input').check()
    cy.contains('button','Remove').trigger('mouseover').should('be.enabled').click();
    cy.contains('button','Enable').click();
  })

  it('Form Authentication', {retries: 1}, () => {
    cy.get('a[href]').eq(21).click()
    cy.get('#username').type('Ayena Noor');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button').click();
    
    // cy.customCommand().then(() => {
    const shouldFailTest = Cypress.env('failTestCondition');
    if (shouldFailTest) {
      cy.log('Intentional failure - test will fail now');
      cy.get('#someOtherElement').should('not.exist');
    }
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button').click();
  })
})