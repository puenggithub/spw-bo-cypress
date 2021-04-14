import { Login } from "../../../../support/spw_login.js"
import { Logout } from "../../../../support/spw_logout.js"
import { SelectStore } from "../../../../support/spw_select_store.js"

describe("Test Catalog page", () => {

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

  it.skip("TC_BS01 - Verify if Best Seller page display correctly", () => { 
    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/products/best_seller")
    cy.contains("Best Seller Product").should("exist")

    // check top section
    cy.contains("Filter").should('exist')
    cy.get("button.primary:nth-child(1)").should('exist')  // add button
    cy.get("button.ant-btn-primary:nth-child(2)").should('exist')  // delete button
    cy.get("button.ant-btn-primary:nth-child(2)").should('be.disabled')
    cy.contains("Item Id").should('exist')
    cy.get("#ItemId").should('exist')
    cy.get(".ant-btn-default").should('exist')  // reset button
    cy.get("button.primary:nth-child(2)").should('exist')  // filter button

    // check table
    cy.contains("Best Seller List").should('exist')
    cy.contains("Item Id").should('exist')
    cy.contains("Image").should('exist')
    cy.contains("Product Name").should('exist')
    cy.contains("Best Seller Tag").should('exist')
    cy.contains("Price").should('exist')
    cy.contains("Ranking No").should('exist')
    cy.contains("Action").should('exist')

  })

  it.skip("TC_BS02 - Verify if user can add Best Seller item", () => { 
    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/products/best_seller")
    cy.contains("Best Seller Product").should("exist")
    
    // if there is existing data
    var rankNo = 1
    cy.get("body").then(($body) => { 
      if ($body.find("tr.ant-table-row:nth-child(1) > td:nth-child(8) > div:nth-child(1) > button:nth-child(1)").length > 0) {
        cy.get("tr.ant-table-row:nth-child(1) > td:nth-child(7)").then(($td) => {
            rankNo = $td.text();
            cy.log("check rank #1 = " + rankNo)
            cy.get("tr.ant-table-row:nth-child(1) > td:nth-child(8) > div:nth-child(1) > button:nth-child(2)").eq(0).click()
            cy.get(".ant-modal-confirm-btns > button:nth-child(2)").click()
            cy.get(".ant-btn-default").click()
        })
      } 
    });
    
    cy.fixture("testdata").then(function (productid) {
        cy.get("#ItemId").type(productid.bestseller)
        cy.get("button.primary:nth-child(2)").click()

        // check if user already set "9000232586" (test data from testdata.json) as Best Seller
        cy.get('body').then(($body) => {
            if ($body.text().includes(productid.bestseller)){
              cy.wait(2000)
              
              // get Rank No
              cy.get("tr.ant-table-row:nth-child(1) > td:nth-child(7)").then(($td) => {
                rankNo = $td.text();
                cy.log("Check Rank #2 = " + rankNo)
              })
              cy.get("tr.ant-table-row:nth-child(1) > td:nth-child(8) > div:nth-child(1) > button:nth-child(2)").eq(0).click()
              cy.get(".ant-modal-confirm-btns > button:nth-child(2)").click()
              cy.contains(productid.bestseller).should('not.exist')
              cy.get(".ant-btn-default").click()

            } 
        })

        cy.log("Add Best Seller with rank " + rankNo)
        
        // add new Best Seller
        cy.get("button.primary:nth-child(1)").click()  // click add button
        cy.get(".ant-collapse-header > div:nth-child(2)").click() 
        cy.get(".form-item > input:nth-child(1)").type(productid.bestseller)
        cy.get("button.ant-btn:nth-child(3)").click() 
        cy.wait(3000)
        cy.get("[type='radio'].ant-radio-input").first().check()
        cy.get(".ant-input-number-input").type(rankNo)
        cy.get("#BestSellerTag").type("test")
        cy.get(".success").click()
   
        cy.contains(productid.bestseller).should('exist')
        
    })
  })

  /** 
  * Pre-condition: execute TC_BS02 first
  */
  it("TC_BS03 - Verify if user can search Best Seller after added", () => { 
    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/products/best_seller")
    cy.contains("Best Seller Product").should("exist")

    cy.fixture("testdata").then(function (productid) {
      cy.get("#ItemId").type(productid.bestseller)
      cy.get("button.primary:nth-child(2)").click()
      cy.get("table").contains("td", productid.bestseller);
    })
  })

  it.skip("TC_BS04 - Verify if user can delete Best Seller", () => { 

    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/products/best_seller")
    cy.contains("Best Seller Product").should("exist")
    
    // if there is existing data
    cy.get("body").then(($body) => { 
      if ($body.find("tr.ant-table-row:nth-child(1) > td:nth-child(8) > div:nth-child(1) > button:nth-child(1)").length > 0){
          cy.get("tr.ant-table-row:nth-child(1) > td:nth-child(7)").then(($td) => {
            cy.get("tr.ant-table-row:nth-child(1) > td:nth-child(8) > div:nth-child(1) > button:nth-child(2)").eq(0).click()
            cy.get(".ant-modal-confirm-btns > button:nth-child(2)").click()
            cy.get(".ant-btn-default").click()
          })
      } else cy.get("Cannot delete item because there is no Best Seller item available!!!")
    })
  })

  it.skip("TC_BS05 - Verify if user can edit Best Seller item", () => { 
    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/products/best_seller")
    cy.contains("Best Seller Product").should("exist")
    cy.contains("Price").should("exist")
   
    cy.wait(2000)
    // if there is existing data
    cy.get("body").then(($body) => { 
      if ($body.find("tr.ant-table-row:nth-child(1) > td:nth-child(8) > div:nth-child(1) > button:nth-child(1)").length > 0){
        const moment= require("moment") 
        const now24Time = moment().format("YYMMDD-HHmmss")
        const newTag = "Test_" + now24Time
        var TagEdited

        cy.get("tr.ant-table-row:nth-child(1) > td:nth-child(7)").then(($td) => {
          cy.get("tr.ant-table-row:nth-child(1) > td:nth-child(8) > div:nth-child(1) > button:nth-child(1)").eq(0).click()
          cy.get("#BestSellerTag").clear()
          cy.get("#BestSellerTag").type(newTag)
          cy.get(".success").click()
        })

        cy.contains("Price").should("exist")
        cy.get("tr.ant-table-row:nth-child(1) > td:nth-child(5)").then(($td) => {
          expect($td).to.have.text(newTag)
          TagEdited = $td.text()
          cy.log(TagEdited)
          
        })

      // cy.get('tbody > tr').find('td:nth-child(5)').eq(1).invoke('text').then(text => should.

      } else cy.get("Cannot edit item because there is no Best Seller item available!!!")
    })
  })
})