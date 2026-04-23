/**
 * Normalizes an email address by trimming whitespace and lowercasing.
 *
 * This is the canonical normalization for email addresses across the codebase.
 * All email comparison and storage paths should use this function.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
