describe("Test Login Success", function () {
    it('test for login using the fixture data', function () {
      cy.visit('http://159.138.231.186:3000/ ');
      cy.fixture('testdata').then(function (user) {
         cy.log(user);
         cy.get('#Email').type(user.username);
         cy.get('#Password').type(user.password);
         cy.get('button[type=button]').click();

         //check header
         cy.contains('Home').should('exist')

      });

      //logout
      cy.get('.name').click();
      cy.get('.ant-dropdown-menu-item').last().click();
      cy.get('.ant-btn-primary').click();


     });

    

   });