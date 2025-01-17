let uniqueEmail;
const duplicateEmail = 'register@register.com'; // Static email for initial scenario

describe('User Registration', () => {
  // Set up unique email before each test
  beforeEach(() => {
    const now = new Date();
    uniqueEmail = `register+${now.toISOString().replace(/[-:.TZ]/g, '')}@register.com`; // Generate a unique email with ISO string
    cy.visit('/auth/register'); // Navigate to the registration page before each test
  });

  it('should visit the registration page', () => {
    // Confirm that the registration page is loaded
    cy.url().should('include', '/auth/register');
  });

  it('should fill in the registration form with valid details and submit successfully', () => {
    // Fill in the registration form with valid data
    cy.get('[data-test=first-name]').type('Jay');
    cy.get('[data-test=last-name]').type('Jay');
    cy.get('[data-test=dob]').type('1999-06-06');
    cy.get('[data-test=address]').type('address');
    cy.get('[data-test=postcode]').type('1009');
    cy.get('[data-test=city]').type('truth');
    cy.get('[data-test=state]').type('sa');
    cy.get('[data-test=country]').select('Algeria');
    cy.get('[data-test=phone]').type('123455667788'); // Valid phone number
    cy.get('[data-test=email]').type(uniqueEmail); // Use unique email
    cy.get('[data-test=password]').type('Ch00s3P4ssw0rd!');

    // Submit the registration form
    cy.get('[data-test=register-submit]').click();

    // Assert that the user is redirected to the login page after successful registration
    cy.url().should('include', '/auth/login');
  });

  it('should display an error message for duplicate email', () => {
    // Use the last registered email for this test
    cy.get('[data-test=first-name]').type('Jay');
    cy.get('[data-test=last-name]').type('Jay');
    cy.get('[data-test=dob]').type('1999-06-06');
    cy.get('[data-test=address]').type('address');
    cy.get('[data-test=postcode]').type('1009');
    cy.get('[data-test=city]').type('truth');
    cy.get('[data-test=state]').type('sa');
    cy.get('[data-test=country]').select('Algeria');
    cy.get('[data-test=phone]').type('123455667788'); // Valid phone number
    cy.get('[data-test=email]').type(uniqueEmail); // Use the previously registered email
    cy.get('[data-test=password]').type('Ch00s3P4ssw0rd!');
    cy.get('[data-test=register-submit]').click();

    // Assert that the error message for duplicate email appears
    cy.contains('A customer with this email address already exists').should('be.visible');
  });

  it('should display an error message for phone number with alpha characters', () => {
    cy.get('[data-test=first-name]').type('Jay');
    cy.get('[data-test=last-name]').type('Jay');
    cy.get('[data-test=dob]').type('1999-06-06');
    cy.get('[data-test=address]').type('address');
    cy.get('[data-test=postcode]').type('1009');
    cy.get('[data-test=city]').type('truth');
    cy.get('[data-test=state]').type('sa');
    cy.get('[data-test=country]').select('Algeria');
    cy.get('[data-test=phone]').type('abc123xyz'); // Invalid phone number with alpha characters
    cy.get('[data-test=email]').type(uniqueEmail); // Use unique email
    cy.get('[data-test=password]').type('Ch00s3P4ssw0rd!');

    cy.get('[data-test=register-submit]').click();
    cy.contains('Only numbers are allowed.').should('be.visible'); // Adjust message as per your app
  });

  it('should display an error message for weak password', () => {
    cy.get('[data-test=first-name]').type('Jay');
    cy.get('[data-test=last-name]').type('Jay');
    cy.get('[data-test=dob]').type('1999-06-06');
    cy.get('[data-test=address]').type('address');
    cy.get('[data-test=postcode]').type('1009');
    cy.get('[data-test=city]').type('truth');
    cy.get('[data-test=state]').type('sa');
    cy.get('[data-test=country]').select('Algeria');
    cy.get('[data-test=phone]').type('123455667788'); // Valid phone number
    cy.get('[data-test=email]').type(uniqueEmail); // Use unique email
    cy.get('[data-test=password]').type('P4ssw0rd!'); // Weak password

    cy.get('[data-test=register-submit]').click();
    cy.contains('The given password has appeared in a data leak. Please choose a different password.').should('be.visible'); 
  });
});
