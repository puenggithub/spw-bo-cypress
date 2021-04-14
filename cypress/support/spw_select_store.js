export function SelectStore(id) {

    describe("Homepage - ChangeStore", function () {
        cy.get('.ant-select-selection__rendered').click()
        cy.get('li.ant-select-dropdown-menu-item').contains(id).click()
        
    });
  }