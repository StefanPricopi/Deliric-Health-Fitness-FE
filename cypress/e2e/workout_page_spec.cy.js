describe('Full Workflow Test', () => {
    beforeEach(() => {
        cy.intercept('POST', '/users/login').as('login');
        cy.intercept('GET', '/workout-plans', { fixture: 'workoutPlans.json' }).as('getWorkoutPlans');
        cy.intercept('GET', '/users/pts', { fixture: 'pts.json' }).as('getPTs');
        cy.intercept('POST', '/workout-plans', { statusCode: 200 }).as('createWorkoutPlan');
        cy.intercept('GET', '/workout-plans/by-pt/10008', { fixture: 'filteredWorkoutPlans.json' }).as('getWorkoutPlansByPT3');
        cy.intercept('GET', '/workout-plans/by-pt/9', { fixture: 'workoutPlans.json' }).as('getWorkoutPlansByPT123456');
        cy.intercept('GET', '/subscriptions/list*', { fixture: 'subscriptions.json' }).as('getSubscriptions');
        cy.intercept('POST', '/subscriptions/subscribe', { statusCode: 200 }).as('subscribe');
        cy.intercept('POST', '/subscriptions/unsubscribe', { statusCode: 200 }).as('unsubscribe');
        cy.intercept('GET', '/workout-plans/1', { fixture: 'workoutPlanDetail.json' }).as('getWorkoutPlanDetail');
    });

    it('should perform the full workflow correctly', () => {
        // Step 1: Log in as a PT
        cy.visit('http://localhost:5173/login');
        cy.get('input[placeholder="Enter your username"]').type('pt123456');
        cy.get('input[placeholder="Enter your password"]').type('Test123@');
        cy.get('button[type="submit"]').click();
        cy.wait('@login').then((interception) => {
            cy.log('Login Response:', interception.response.body);
        });

        // Step 2: Check if workouts are loaded
        cy.url().should('include', '/workouts');
        cy.wait('@getWorkoutPlans').then((interception) => {
            cy.log('Get Workout Plans Response:', interception.response.body);
            expect(interception.response.body).to.have.property('workoutPlans').that.is.an('array').and.have.length(3);
        });

        // Ensure workout plans are visible
        cy.get('.workout-plan-card').should('have.length', 3);

        // Step 3: Ensure PT dropdown is populated
        cy.wait('@getPTs').then((interception) => {
            cy.log('Get PTs Response:', interception.response.body);
            expect(interception.response.body).to.be.an('array').and.have.length(2);
        });

        cy.get('select').children('option').should('have.length', 3); // Including default option 'Select PT'

        // Step 4: Change to a different PT and check the filtering
        cy.get('select').select('10008').then(() => {
            cy.log('Selected PT: pt3');
            cy.wait('@getWorkoutPlansByPT3').then((interception) => {
                cy.log('Get Workout Plans by PT Response:', interception.response.body);
                expect(interception.response.body).to.have.property('workoutPlans').that.is.an('array').and.have.length(1);
            });
        });

        // Adding a small delay to ensure DOM update
        cy.wait(1000);

        // Ensure filtered workout plan is visible
        cy.get('.workout-plan-card').should('have.length', 1);

        // Step 5: Change back to the first PT and check the filtering
        cy.get('select').select('9').then(() => {
            cy.log('Selected PT: pt123456');
            cy.wait('@getWorkoutPlansByPT123456').then((interception) => {
                cy.log('Get Workout Plans Response:', interception.response.body);
                expect(interception.response.body).to.have.property('workoutPlans').that.is.an('array').and.have.length(3);
            });
        });

        // Adding a small delay to ensure DOM update
        cy.wait(1000);

        // Ensure original workout plans are visible again
        cy.get('.workout-plan-card').should('have.length', 3);

        // Step 6: Press view details and check the redirection
        cy.get('.workout-plan-card').first().find('a.details-link').click();
        cy.url().should('include', '/workout/');

        // Wait for the workout plan details to be fetched
        cy.wait('@getWorkoutPlanDetail').then((interception) => {
            cy.log('Get Workout Plan Detail Response:', interception.response.body);
        });

        // Wait for the h1 element to be present before making assertion
        cy.get('h1', { timeout: 10000 }).should('be.visible').and('contain', 'Workout Details');

       
    });
});
