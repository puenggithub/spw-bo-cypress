import { Logout } from "./spw_logout.js"

export function Login() {

    describe("Homepage - Login", function () {
        cy.visit("http://159.138.231.186:3000/ ");


        cy.get("body").then($body =>{
            const content = $body.contents();
            if (content.find(".ant-modal-content").length) {
              cy.get("body > div:nth-child(8) > div > div.ant-modal-wrap > div > div.ant-modal-content > div > div > div.ant-modal-confirm-btns > button)").click()
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