import { describe, expect, it } from "vitest";

import {
  comparePassword,
  generateRandomPassword,
  hashPassword,
} from "../../src/crypto/password.js";

describe("Password utilities", () => {
  it("should hash and verify passwords correctly", async () => {
    const password = "test-password-123";
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).not.toBe(password);
    expect(hashedPassword.length).toBeGreaterThan(10);

    const isValid = await comparePassword(password, hashedPassword);
    expect(isValid).toBe(true);

    const isInvalid = await comparePassword("wrong-password", hashedPassword);
    expect(isInvalid).toBe(false);
  });

  it("should handle empty passwords", async () => {
    // bcrypt allows empty passwords, so we just test it works
    const hashedEmpty = await hashPassword("");
    expect(hashedEmpty).toBeTruthy();
    expect(await comparePassword("", hashedEmpty)).toBe(true);
  });

  describe("generateRandomPassword", () => {
    it("should generate a password of default length", () => {
      const password = generateRandomPassword();
      expect(password).toBeTruthy();
      expect(password.length).toBe(16);
    });

    it("should generate a password of specified length", () => {
      const password = generateRandomPassword(24);
      expect(password).toBeTruthy();
      expect(password.length).toBe(24);
    });

    it("should generate unique passwords", () => {
      const password1 = generateRandomPassword();
      const password2 = generateRandomPassword();
      expect(password1).not.toBe(password2);
    });

    it("should contain at least one lowercase letter", () => {
      const password = generateRandomPassword();
      expect(/[a-z]/.test(password)).toBe(true);
    });

    it("should contain at least one uppercase letter", () => {
      const password = generateRandomPassword();
      expect(/[A-Z]/.test(password)).toBe(true);
    });

    it("should contain at least one number", () => {
      const password = generateRandomPassword();
      expect(/\d/.test(password)).toBe(true);
    });

    it("should contain at least one special character", () => {
      const password = generateRandomPassword();
      expect(/[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/.test(password)).toBe(true);
    });

    it("should work with minimum length", () => {
      const password = generateRandomPassword(4);
      expect(password.length).toBe(4);
      /* Should still contain all character types */
      expect(/[a-z]/.test(password)).toBe(true);
      expect(/[A-Z]/.test(password)).toBe(true);
      expect(/\d/.test(password)).toBe(true);
      expect(/[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/.test(password)).toBe(true);
    });
  });
});
