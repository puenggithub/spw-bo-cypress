
import { Login } from '../../../../support/spw_login.js'
import { Logout } from '../../../../support/spw_logout.js'
import { SelectStore } from '../../../../support/spw_select_store.js'


describe("Homepage - Verify Home page", function () {
  before(() => {
    Login()
    cy.fixture('testdata').then(function (data) {
      SelectStore(data.ecom_jsm)
    })
  })

  after(() => {
    Logout()

  })

 afterEach(function onAfterEach() {
  if (this.currentTest.state === 'failed') {
    Logout()
    cy.setCookie('shouldSkip', 'true');
    //set cookie to skip tests for further specs
    Cypress.runner.stop();
    //this will skip tests only for current spec
  }
});

    it('Verify if Home page displays correctly', function () {
         //check header
         cy.contains('Home').should('exist')
         cy.get(".ant-select-selection-selected-value").should('exist')
         cy.get(".name").should('exist')
  
        //check side menu        
         cy.contains('Catalog').should('exist')
         cy.contains('Customers').should('exist')
         cy.contains('Marketing').should('exist')
         cy.contains('Information Setting').should('exist')
         cy.contains('Report').should('exist')
         cy.contains('Sales').should('exist')
         cy.contains('Customers').should('exist')
         cy.contains('Setting').should('exist')
         cy.contains('POS Back office').should('exist')
         cy.contains('Enterprise').should('exist')
         cy.contains('Delivery').should('exist')
         cy.contains('Sale Channel').should('exist')
         cy.contains('Inventory').should('exist')

      });

     });

    
