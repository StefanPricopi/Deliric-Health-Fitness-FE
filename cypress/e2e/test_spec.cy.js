describe('Verify New Design Structure', () => {
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
  
    it('should log in and verify the workout plans list', () => {
        // Step 1: Log in as a PT
        cy.visit('http://localhost:5173/login');
        cy.get('input[placeholder="Enter your username"]').type('pt123456');
        cy.get('input[placeholder="Enter your password"]').type('Test123@');
        cy.get('button[type="submit"]').click();
        cy.wait('@login');
  
        // Step 2: Check if workouts are loaded
        cy.url().should('include', '/workouts');
        cy.wait('@getWorkoutPlans').then((interception) => {
            cy.log('Get Workout Plans Response:', interception.response.body);
            expect(interception.response.body).to.have.property('workoutPlans').that.is.an('array').and.have.length(3);
        });
  
        // Verify if the workout plan elements are present
        cy.get('.workout-plan-card').should('have.length', 3);
    });
  });
  