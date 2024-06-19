describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login'); // Update the URL to your login page route
  });

  it('should display login form', () => {
    cy.get('form').should('be.visible');
  });

  it('should show error message on missing fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('contain', 'All fields are required');
  });

  it('should show error message on incorrect credentials', () => {
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('contain', 'Login failed. Please try again.');
  });

  it('should login successfully with correct credentials and navigate', () => {
    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/workouts'); // Update to the expected URL after login
  });
});
