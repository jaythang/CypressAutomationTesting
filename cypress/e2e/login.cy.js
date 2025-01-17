// Define registered and unregistered email constants
const registeredEmail = 'register@register.com';
const unregisteredEmail = 'unregistered@register.com';
const password = 'Ch00seP4ssw0rd!';

// Function to log in with given credentials
function login(email, password) {
  cy.visit('https://practicesoftwaretesting.com/auth/login'); // Navigate to login page
  cy.get('[data-test=email]').type(email); // Enter email
  cy.get('[data-test=password]').type(password); // Enter password
  cy.get('[data-test=login-submit]').click(); // Submit login form
}

describe('Login Tests', () => {
  it('should log in with a registered email and navigate through account options', () => {
    // Log in with a registered email
    login(registeredEmail, password);

    // Validate successful login
    cy.url().should('include', '/account');

    // Navigate through various account options
    const navigationOptions = ['nav-favorites', 'nav-profile', 'nav-invoices', 'nav-messages', 'nav-favorites'];
    navigationOptions.forEach((option) => {
      cy.get(`[data-test=${option}]`).click();
      cy.visit('https://practicesoftwaretesting.com/account');
cy.get('[data-test=nav-menu]').click();
cy.get('[data-test=nav-menu]').click();
cy.url().should('contains', 'https://practicesoftwaretesting.com/account');

    });
  });

  it('should display an error for an unregistered email', () => {
    // Attempt to log in with an unregistered email
    login(unregisteredEmail, password);

    // Validate error message for invalid login
    cy.contains('Invalid email or password').should('be.visible');
  });
});
