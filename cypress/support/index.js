// Listen to the uncaught:exception event
Cypress.on('uncaught:exception', (err, runnable) => {
    // Return false to prevent Cypress from failing the test
    return false;
  });