/**
 * Array of password validation tests, each with a validation function and description
 */
const passwordTests = [
  {
    isValid: (password: string) => password.length >= 8,
    description: "minimum eight characters",
  },
];

/**
 * Checks if a password passes all validation tests
 * @param password - The password to validate
 * @returns True if the password passes all tests, false otherwise
 */
export const isPasswordValid = (password: string): boolean =>
  passwordTests.every((test) => test.isValid(password));

/**
 * Tests a password against all validation rules and returns descriptions of failed tests
 * @param password - The password to test
 * @returns An array of descriptions for the failed validation tests
 */
export const testPassword = (password: string): string[] => {
  const failedTests = passwordTests.filter((test) => !test.isValid(password));
  return failedTests.map((test) => test.description);
};
