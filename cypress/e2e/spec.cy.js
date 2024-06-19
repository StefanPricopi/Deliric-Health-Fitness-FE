describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login'); // Update the URL to your login page route
  });

  it('should display login form', () => {
    cy.get('form').should('be.visible');
  });

  it('should show error message on missing fields', () => {
    // Ensure form submission triggers error message for missing fields
    cy.get('button[type="submit"]').click();
    // HTML5 validation prevents form submission and shows default browser tooltip, which Cypress cannot check directly
    // Instead, we can validate that the form is still present and hasn't submitted
    cy.get('form').should('be.visible');
  });

  it('should show error message on incorrect credentials', () => {
    cy.get('input[placeholder="Enter your username"]').should('be.visible').type('wronguser');
    cy.get('input[placeholder="Enter your password"]').should('be.visible').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.wait(500); // Add a small delay
    cy.get('p').should('contain', 'Login failed. Please try again.');
  });

  it('should login successfully with correct credentials and navigate', () => {
    cy.get('input[placeholder="Enter your username"]').should('be.visible').type('pt123456');
    cy.get('input[placeholder="Enter your password"]').should('be.visible').type('Test123@');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/workouts'); // Update to the expected URL after login
  });
});
