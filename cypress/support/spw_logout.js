export function Logout() {

  describe("Homepage - Logout", function () {
        //logoutcy.get(".name")
       // cy.wait(".name")
      cy.get("body").then($body => { 
        if ($body.text().includes("Session expired, please login again")) {
          // do something
          cy.get("div.ant-modal-confirm-btns > button").click()
        }
      })
      cy.get(".name").click();
      cy.get(".ant-dropdown-menu-item").last().click();
      //cy.get("li.ant-dropdown-menu-item:nth-child(3) > a:nth-child(1) > span:nth-child(2)").click();
      cy.get("button.ant-btn-primary:nth-child(2)").click();

    });
}