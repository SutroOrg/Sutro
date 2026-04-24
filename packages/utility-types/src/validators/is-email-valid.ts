// Source: https://dirask.com/posts/TypeScript-validate-email-with-regex-Dn40Ej
const emailValidator =
  /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

/**
 * Validates an email address using a comprehensive regex pattern.
 *
 * The regex enforces:
 * - Total length <= 254 characters (RFC 5321)
 * - Local part (before @) <= 64 characters (RFC 5321)
 * - Valid character sets for local and domain parts
 *
 * Note: This does not handle quoted strings in the local part or all edge cases
 * from RFC 5322, but covers the vast majority of practical email addresses.
 *
 * @param email - The email address to validate
 * @returns True if the email appears valid, false otherwise
 */
export const isEmailValid = (email: string): boolean => {
  if (!email || typeof email !== "string") {
    return false;
  }

  // Trim whitespace before validation
  const trimmedEmail = email.trim();

  // Empty string after trimming is invalid
  if (trimmedEmail.length === 0) {
    return false;
  }

  return emailValidator.test(trimmedEmail);
};
