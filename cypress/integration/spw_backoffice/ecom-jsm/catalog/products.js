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

    it.skip("TC_P01 - Verify if Products page display correctly ", () => {  
        // check header
        cy.contains("Home").should("exist")
        cy.visit("http://159.138.231.186:3000/#/products/list")
        cy.contains("Products").should("exist")

        // check top section
        cy.contains("Filter").should('exist')
        cy.get("button.primary:nth-child(1)").should('exist')  // add button
        cy.get(".warning").should('exist')  // create QR button
        cy.get(".error").should('exist')    // delete button
        cy.get(".warning").should('be.disabled')
        cy.get(".error").should('be.disabled')
        cy.contains("Product name").should('exist')
        cy.get("#ProductName").should('exist')
        cy.contains("Category Id").should('exist')
        cy.get("#CategoryId").should('exist')
        cy.contains("Price").should('exist')
        cy.get("#Price > div:nth-child(2) > input:nth-child(1)").should('exist')
        cy.get("#Price_1 > div:nth-child(2) > input:nth-child(1)").should('exist')
        cy.contains("Item Id").should('exist')
        cy.get("#ItemId").should('exist')
        cy.contains("Status").should('exist')
        cy.get("#Status > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)").should('exist')
        cy.contains("Internal barcode").should('exist')
        cy.get("#BarcodeId").should('exist')
        cy.contains("Vendor barcode").should('exist')
        cy.get("#VendorBarcode").should('exist')
        cy.get(".ant-btn-default").should('exist')
        cy.get("button.primary:nth-child(2)").should('exist')

        // check table
        cy.contains("Product List ").should('exist')
        cy.contains("Item Id").should('exist')
        cy.contains("Internal barcode").should('exist')
        cy.contains("Vendor barcode").should('exist')
        cy.contains("Image").should('exist')
        cy.contains("Product name").should('exist')
        cy.contains("Action").should('exist')
    
    })

    it("TC_P02 - Verify if user can search Products", () => {  
        // check header
        cy.contains("Home").should("exist")
        cy.visit("http://159.138.231.186:3000/#/products/list")
        cy.contains("Products").should("exist")
        cy.wait(3000)

        var itemid
        cy.get("body").then(($body) => { 
            if ($body.find(".ant-table-fixed-right > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1) > button:nth-child(1)").length > 0) {
              cy.get(".ant-table-fixed-left > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(2)").then($td => {
                itemid = $td.text();
                cy.log(itemid)

                cy.get("#ItemId").type(itemid)
                cy.get("button.primary:nth-child(2)").click()
                cy.get("table").contains("td", itemid);
              })
            } else cy.get("No Products item available!!!")
        })
    })

})