import bcrypt from "bcrypt";
import passwordGenerator from "generate-password";

const SALT_ROUNDS = 11;

/**
 * Generates a cryptographically secure random password
 * @param length - Length of the password to generate (default: 16)
 * @returns Random password string containing letters, numbers, and special characters
 */
export const generateRandomPassword = (length: number = 16): string => {
  return passwordGenerator.generate({
    length,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    strict: true /* Ensures at least one character from each enabled pool */,
  });
};

/**
 * Hashes a password using bcrypt
 * @param password - Plain text password to hash
 * @param saltRounds - Number of salt rounds to use (default: 11)
 * @returns Hashed password
 */
export const hashPassword = (
  password: string,
  saltRounds: number = SALT_ROUNDS
): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

/**
 * Compares a password against a hash to check if they match
 * @param password - Plain text password to check
 * @param hash - Hashed password to compare against
 * @returns Boolean indicating if password matches hash
 */
export const comparePassword = (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
