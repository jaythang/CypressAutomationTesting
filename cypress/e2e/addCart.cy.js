// Define constants for login credentials
const registeredEmail = 'register@register.com';
const password = 'Ch00seP4ssword!';

// Function to log in
function login(email, password) {
  cy.visit('https://practicesoftwaretesting.com/auth/login'); // Navigate to the login page
  cy.get('[data-test=email]').type(email); // Enter email
  cy.get('[data-test=password]').type(password); // Enter password
  cy.get('[data-test=login-submit]').click(); // Submit the login form
}

// Function to complete the checkout process
function completeCheckout(quantity, paymentMethod) {
  cy.visit('https://practicesoftwaretesting.com/product/01JHRNGV3T04J1BNTK0V5HJB9W'); // Navigate to a specific product page

  // Wait until the "Add to Cart" button is visible
  cy.get('[data-test=add-to-cart]', { timeout: 10000 }).should('be.visible');
  cy.get('[data-test=add-to-cart]').click(); // Add product to cart

  cy.get('[data-test="nav-cart"] .svg-inline--fa').click(); // Open the cart
  cy.get('[data-test=product-quantity]')
    .clear() // Clear existing quantity
    .type(quantity); // Set new quantity
  cy.get('.ng-star-inserted:nth-child(1) > .col-md-1 path').click(); // Remove an item from the cart
  cy.get('[data-test=proceed-1]').click(); // Proceed to checkout step 1

  // Check if redirected to login during checkout
  cy.url().then((url) => {
    if (url.includes('/auth/login')) {
      login(registeredEmail, password); // Log in with the registered account
      cy.get('[data-test="nav-cart"] .svg-inline--fa').click(); // Return to the cart
      cy.get('[data-test=proceed-1]').click(); // Retry proceeding to checkout
    }
  });

  cy.get('[data-test=proceed-2]').click(); // Proceed to checkout step 2
  cy.get('[data-test=proceed-3]').click(); // Proceed to checkout step 3
  cy.get('[data-test=payment-method]').select(paymentMethod); // Select payment method
  cy.get('[data-test=finish]').click(); // Finish the purchase
  cy.url().should('eq', 'https://practicesoftwaretesting.com/'); // Validate successful redirection
}

describe('E-commerce Checkout Flow', () => {
  before(() => {
    // Log in before starting tests
    login(registeredEmail, password);
  });

  it('should complete the checkout process with specified details', () => {
    completeCheckout('99', 'cash-on-delivery'); // Complete checkout with desired options
  });
});
