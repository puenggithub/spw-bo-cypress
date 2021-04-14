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
    // Cypress.runner.stop();
      //this will skip tests only for current spec
    }
  })

  it.skip("TC_C01 - Verify if Categories page display correctly ", () => {  
    // check header
    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/categories/list")
    cy.contains("Categories").should("exist")

    // check top section
    cy.get("button.ant-btn-icon-only:nth-child(1)").should("exist") // add button
    cy.get("button.ant-btn-icon-only:nth-child(2)").should("exist") // delete button
    cy.contains("Filter").should("exist")
    cy.contains("Category Id").should("exist")
    cy.get("#CategoryId").should("exist")
    cy.contains("Categorie Name").should("exist")
    cy.get("#Name").should("exist")
    cy.contains("Status").should("exist")
    cy.get("#Status").should("exist")
    cy.contains("Level").should("exist")
    cy.get("#Level").should("exist")
    cy.get(".page-btn > button:nth-child(1)").should("exist")  // Reset button
    cy.get(".primary").should("exist")  // Filter button
    cy.contains("Categorie List").should("exist")

    // checl table header
    cy.get("table").contains("span", "Category Id");
    cy.get("table").contains("span", "Name");
    cy.get("table").contains("span", "Sort Order");
    cy.get("table").contains("span", "Level");
    cy.get("table").contains("span", "Status");
    cy.get("table").contains("span", "Date Added");
    cy.get("table").contains("span", "Date Modified");
    cy.get("table").contains("span", "Action");
    
  })
  
  it.skip("TC_C02 - Verify if Add Categories page display correctly", () => { 
    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/categories/list")
    cy.contains("Categories").should("exist")

    cy.get("button.ant-btn-icon-only:nth-child(1)").click()  // click add button
    
    cy.get(".context > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)").should("exist") // General tab
    cy.get(".context > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)").should("exist") // Data tab

    cy.get(".base-info > div:nth-child(1) > div:nth-child(1)").should("exist")  // English tab
    cy.get(".base-info > div:nth-child(1) > div:nth-child(2)").should("exist")  // Thai tab
    cy.get(".base-info > div:nth-child(1) > div:nth-child(3)").should("exist")  // Chinese tab

    cy.contains("Category Name").should("exist")  
    cy.get("#baseInfo_1_Name").should("exist") 
    cy.contains("Meta Tag Title").should("exist")  
    cy.get("#baseInfo_1_MetaTitle").should("exist") 
    cy.contains("Description").should("exist")  
    cy.get(".tox-editor-container").should("exist") 
    cy.contains("Meta Tag Description").should("exist")  
    cy.get("#baseInfo_1_MetaDescription").should("exist") 
    cy.contains("Meta Tag Keywords").should("exist")  
    cy.get("#baseInfo_1_MetaKeyword").should("exist")

  })

  it("TC_C03 - Verify if user can add new Categories correctly", () => { 
    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/categories/list")
    cy.contains("Categories").should("exist")

    cy.get("button.ant-btn-icon-only:nth-child(1)").click()  // click add button

    const moment= require("moment") 
    const now24Time = moment().format("YYMMDD-HHmmss")
    const categoryEng = "Test_" + now24Time
    const categoryTh = "เทส_" + now24Time
    cy.log("Current Timezone in 24hrs", now24Time)

    // enter value in English tab
    cy.get("#baseInfo_1_Name").type(categoryEng)
    cy.get("#baseInfo_1_MetaTitle").type(categoryEng) 

    // enter value in Thai tab
    cy.get(".base-info > div:nth-child(1) > div:nth-child(2)").click()
    cy.get("#baseInfo_2_Name").type(categoryTh)
    cy.get("#baseInfo_2_MetaTitle").type(categoryTh)

    // enter value in Data tab
    cy.get(".context > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)").click()
    cy.get("#data_Top > label:nth-child(1) > span:nth-child(1) > input:nth-child(1)").click()

    // click save
    cy.get(".success").click()

  })


  it("TC_C04 - Verify if user can search Categories after added", () => { 
    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/categories/list")
    cy.contains("Categories").should("exist")

    cy.get("#Name").type("Test")
    cy.get(".primary").click()
    cy.get("table").contains("td", "Test");

  })

  /**
  * Pre-condition: execute TC_03 first
  */
  it.skip("TC_C05 - Verify if user can update Categories", () => { 
    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/categories/list")
    cy.contains("Categories").should("exist")

    const moment= require("moment") 
    const now24Time = moment().format("YYMMDD")
    const categoryName = "Test_" + now24Time
    
    // search
    cy.get("#Name").type(categoryName)
    cy.get(".primary").click()
    cy.get("table").contains("td", categoryName);

    // edit
    cy.get(".ant-table-tbody > .ant-table-row:nth-child(1) > .ant-table-row-cell-break-word > div > .ant-btn-primary").click()
    cy.get("#baseInfo_1_Name").type("_Update")
    cy.get(".success").click()

    // search after edit
    cy.get("#Name").type("Update")
    cy.get(".primary").click()
    cy.get("table").contains("td", "Update");

  })

  /**
  * Pre-condition: execute TC_03 and TC_C05 first
  */
  it.skip("TC_C06 - Verify if user can delete Categories", () => { 
    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/categories/list")

    // search
    cy.get("#Name").type("Update")
    cy.get(".primary").click()
    cy.get("table").contains("td", "Update");

    // get category name
    cy.get(".ant-table-row:nth-child(1) > td:nth-child(3)").then(($tr) => {
      const categoryName = $tr.text();
      cy.log(categoryName)

      // delete
      cy.get(".ant-table-tbody > .ant-table-row:nth-child(1) > .ant-table-row-cell-break-word > div > .error").click()
      cy.get(".ant-modal-content > .ant-modal-body > .ant-modal-confirm-body-wrapper > .ant-modal-confirm-btns > .ant-btn-primary").click()

      // search
      cy.get("#Name").clear() 
      cy.get("#Name").type(categoryName)
      cy.get(".primary").click()
      cy.get(".ant-empty-description").should("exist")

    })

  })


})
