describe('PT Page Workflow Test', () => {
    beforeEach(() => {
        cy.intercept('POST', '/users/login').as('login');
        cy.intercept('GET', '/users/pts', { fixture: 'pts.json' }).as('getPTs');
        cy.intercept('GET', '/subscriptions/list*', { fixture: 'subscriptions.json' }).as('getSubscriptions');
        cy.intercept('POST', '/subscriptions/subscribe', { statusCode: 200 }).as('subscribe');
        cy.intercept('POST', '/subscriptions/unsubscribe', { statusCode: 200 }).as('unsubscribe');
    });

    it('should load PTs and subscriptions, then subscribe and unsubscribe successfully', () => {
        // Step 1: Log in as a PT
        cy.visit('http://localhost:5173/login');
        cy.get('input[placeholder="Enter your username"]').type('pt123456');
        cy.get('input[placeholder="Enter your password"]').type('Test123@');
        cy.get('button[type="submit"]').click();
        cy.wait('@login');

        // Step 2: Navigate to PTs page
        cy.visit('http://localhost:5173/pts');
        cy.url().should('include', '/pts');

        // Step 3: Check if PTs and subscriptions are loaded
        cy.wait('@getPTs').then((interception) => {
            cy.log('Get PTs Response:', interception.response.body);
            expect(interception.response.body).to.have.length(2);
        });
        cy.wait('@getSubscriptions').then((interception) => {
            cy.log('Get Subscriptions Response:', interception.response.body);
            expect(interception.response.body.subscriptions).to.have.length(1);
        });

        // Ensure PT cards are visible
        cy.get('.pt-card').should('have.length', 2);

        // Step 4: Subscribe to a PT
        cy.get('.pt-card').contains('pt3').parent().find('button').contains('Subscribe').click();
        cy.wait('@subscribe');
        cy.get('.pt-card').contains('pt3').parent().find('button').should('contain', 'Unsubscribe');

        // Step 5: Unsubscribe from a PT
        cy.get('.pt-card').contains('pt3').parent().find('button').contains('Unsubscribe').click();
        cy.wait('@unsubscribe');
        cy.get('.pt-card').contains('pt3').parent().find('button').should('contain', 'Subscribe');
    });
});
