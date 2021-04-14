import { Login } from "../../../../support/spw_login.js"
import { Logout } from "../../../../support/spw_logout.js"
import { SelectStore } from "../../../../support/spw_select_store.js"

describe("Test Threshold Discount page", () => {

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
    Logout()
  })

  it("TC_TD01 - Verify if Threshold Discount page display correctly ", () => {  
    // check header
    cy.contains("Home").should("exist")
    cy.visit("http://159.138.231.186:3000/#/discount/list")
    cy.contains("Campaign for Discount").should("exist")
    cy.get(".tabs > div:nth-child(3)").click()

    // check top section
    cy.get("button.primary:nth-child(1)").should("exist") // add buttonon
    cy.contains("Filter").should("exist")
    cy.contains("Channel").should("exist")
    cy.get("#ChannelId").should("exist")
    cy.contains("Threshold ID").should("exist")
    cy.get("#RuleId").should("exist")
    cy.contains("Campaign (BAHT)(From)").should("exist")
    cy.get("#StartPrice").should("exist")
    cy.contains("Campaign (BAHT)(End)").should("exist")
    cy.get("#EndPrice").should("exist")
    cy.contains("Threshold Target (%)").should("exist")
    cy.get("#ThresholdTarget").should("exist")
    cy.contains("Status").should("exist")
    cy.get(".thresholdDiscount").should("exist")
    cy.contains("Threshold Detail").should("exist")
    cy.get("#ThresholdDetail").should("exist")
    cy.contains("Threshold Discount Type").should("exist")
    cy.get("#ThresholdType").should("exist")

    cy.get("div.page-btn:nth-child(14) > button:nth-child(1)").should("exist")  // Open drop down
    cy.get("div.page-btn:nth-child(14) > button:nth-child(2)").should("exist")  // Reset button
    cy.get("div.page-btn:nth-child(14) > button:nth-child(3)").should("exist")  // Filter button

    // click Open drop down to expand
    cy.get("div.page-btn:nth-child(14) > button:nth-child(1)").click()
    cy.contains("Threshold Discount").should("exist")
    cy.get("#ThresholdDiscount").should("exist")
    cy.get("#ThresholdDiscount").should("be.disabled")
    cy.contains("Date Start(From)").should("exist")
    cy.get("#DateStartFrom").should("exist")
    cy.contains("Date Start(To)").should("exist")
    cy.get("#DateStartEnd").should("exist")
    cy.contains("Date End(From)").should("exist")
    cy.get("#DateEndFrom").should("exist")
    cy.contains("Date End(To)").should("exist")
    cy.get("#DateEndEnd").should("exist")
    cy.contains("Date Added(From)").should("exist")
    cy.get("#DateAddedFrom").should("exist")
    cy.contains("Date Added(To)").should("exist")
    cy.get("#DateAddedEnd").should("exist")
    cy.contains("Date Modified(From)").should("exist")
    cy.get("#DateModifyFrom").should("exist")
    cy.contains("Date Modified(To)").should("exist")
    cy.get("#DateModifyEnd").should("exist")
    cy.get("div.page-btn:nth-child(14) > button:nth-child(1)").should("exist")   // Close drop down


    // checl table header
    cy.contains("Campaign:Threshold Discount List").should("exist")
    cy.get("table").contains("span", "Channel");
    cy.get("table").contains("span", "Threshold ID ");
    cy.get("table").contains("span", "Threshold Detail ");
    cy.get("table").contains("span", "Threshold Campaign (BAHT)");
    cy.get("table").contains("span", "Threshold Target (%)");
    cy.get("table").contains("span", "Threshold Discount");
    cy.get("table").contains("span", "Threshold Type");
    cy.get("table").contains("span", "Status");
    cy.get("table").contains("span", "Date Start");
    cy.get("table").contains("span", "Date End");
    cy.get("table").contains("span", "Date Added");
    cy.get("table").contains("span", "Date Modified");
    cy.get("table").contains("span", "Operation");

  })

})