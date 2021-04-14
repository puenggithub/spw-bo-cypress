import { Logout } from "./spw_logout.js"

export function Login() {

    describe("Homepage - Login", function () {
        cy.visit("http://159.138.231.186:3000/ ");
        cy.wait(1000)

        cy.get("body").then($body => { 
          if ($body.text().includes("Session expired, please login again")) {
            // do something
            cy.get("div.ant-modal-confirm-btns > button").click()
          }
        })

        cy.get("body").then($body =>{
            const content = $body.contents();
            if (content.find(".name").length) {
              Logout()
            }
        })

        cy.fixture("testdata").then(function (user) {
            cy.get("#Email").type(user.username);
            cy.get("#Password").type(user.password);
            cy.get("button[type=button]").click();

            //check header
            cy.contains("Home").should("exist")
          });
        });  
}