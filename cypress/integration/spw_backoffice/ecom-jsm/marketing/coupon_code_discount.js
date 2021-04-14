import { Login } from "../../../../support/spw_login.js"
import { Logout } from "../../../../support/spw_logout.js"
import { SelectStore } from "../../../../support/spw_select_store.js"

describe("Test Coupon Code Discount page", () => {

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

  it("TC_TD01 - Verify if Threshold Discount page display correctly ", () => {  
    // check header
    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/discount/list")
    cy.contains("Campaign for Discount").should("exist")
    cy.get(".tabs > div:nth-child(2)").click()

    // check top section
    cy.get("button.primary:nth-child(1)").should("exist") // add buttonon
    cy.contains("Filter").should("exist")
    cy.contains("Channel").should("exist")
    cy.get("#Channel").should("exist")
    cy.contains("Coupon Rule Id").should("exist")
    cy.get("#CouponRuleId").should("exist")
    cy.contains("Name").should("exist")
    cy.get("#Name").should("exist")
    cy.contains("Coupon Target").should("exist")
    cy.get("#CouponTarget").should("exist")
    cy.contains("Issue Status").should("exist")
    cy.get("#IssueStatus").should("exist")
    cy.contains("Issue Start Date").should("exist")
    cy.get("#IssueStartDate").should("exist")
    cy.contains("Issue End Date").should("exist")
    cy.get("#IssueEndDate").should("exist")
    cy.contains("Vaild Start Date").should("exist")
    cy.get("#VaildStartDate").should("exist")

    cy.get("div.page-btn:nth-child(14) > button:nth-child(1)").should("exist")  // Open drop down
    cy.get("div.page-btn:nth-child(14) > button:nth-child(2)").should("exist")  // Reset button
    cy.get("div.page-btn:nth-child(14) > button:nth-child(3)").should("exist")  // Filter button

    // click Open drop down to expand
    cy.get("div.page-btn:nth-child(14) > button:nth-child(1)").click()
    cy.contains("Vaild End Date").should("exist")
    cy.get("#VaildEndDate").should("exist")
    cy.contains("Start Date Added").should("exist")
    cy.get("#StartDateAdded").should("exist")
    cy.contains("End Date Added").should("exist")
    cy.get("#EndDateAdded").should("exist")
    cy.contains("Start Date Modified").should("exist")
    cy.get("#StartDateModified").should("exist")
    cy.contains("End Date Modified").should("exist")
    cy.get("#EndDateModified").should("exist")
    cy.get("div.page-btn:nth-child(14) > button:nth-child(1)").should("exist")   // Close drop down


    // checl table header
    cy.contains("Coupon List").should("exist")
    cy.get("table").contains("span", "Channel");
    cy.get("table").contains("span", "Coupon Rule Id");
    cy.get("table").contains("span", "Coupon Name");
    cy.get("table").contains("span", "Target");
    cy.get("table").contains("span", "Total");
    cy.get("table").contains("span", "Available");
    cy.get("table").contains("span", "Issue Status");
    cy.get("table").contains("span", "Coupon Valid Start Date");
    cy.get("table").contains("span", "Coupon Valid End Date");
    cy.get("table").contains("span", "Coupon Issue Start Date");
    cy.get("table").contains("span", "Coupon Issue End Date");
    cy.get("table").contains("span", "Date Added");
    cy.get("table").contains("span", "Date Modified");
    cy.get("table").contains("span", "Action");

  })

})