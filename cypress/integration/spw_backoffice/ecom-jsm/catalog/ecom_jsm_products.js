import { Login } from "../../../../support/spw_login.js"
import { Logout } from "../../../../support/spw_logout.js"
import { SelectStore } from "../../../../support/spw_select_store.js"


describe("Test Products page", () => {

    beforeEach(() => {
      Login()
      cy.fixture("testdata").then(function (data) {
        SelectStore(data.ecom_jsm)
      })
    })
  
    afterEach(function onAfterEach() {
      if (this.currentTest.state === "failed") {
       cy.setCookie("shouldSkip", "true");
        //set cookie to skip tests for further specs
       //Cypress.runner.stop();
        //this will skip tests only for current spec
      }
    })


    it("TC_P01 - Verify if Products page display correctly ", () => {  
        // check header
        cy.contains("Home").should("exist")
        cy.visit("http://159.138.231.186:3000/#/products/list")
    
    })


})