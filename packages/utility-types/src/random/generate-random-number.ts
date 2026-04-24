/*
 * This is an implementation of the MWC (multiply with carry) PRNG:
 * https://en.wikipedia.org/wiki/Multiply-with-carry
 *
 * It is used for tests to generate random data deterministically.
 *
 * NEVER USE IN PRODUCTION CODE.
 */

import { inTest } from "../inTest.js";

const pseudoRandom = () => {
  let m_w = 123456789;
  let m_z = 987654321;
  const mask = 0xffffffff;

  // Takes any integer
  function seed(i: number) {
    m_w = (123456789 + i) & mask;
    m_z = (987654321 - i) & mask;
  }

  function get() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
  }
  return {
    seed,
    get,
  };
};

/**
 * We need to be able to generate real random numbers in non-test environments
 * and deterministic random numbers in test environments. This function
 * wraps up the functionality and returns a function that can be used in place
 * of Math.random
 *
 * @param seed passing in a seed to a deterministic PRNG will cause it to return
 *             the same sequence of numbers every time.
 *
 */
export const getRNG = (seed = 0) => {
  let random: ReturnType<typeof pseudoRandom>;

  /**
   * Don't use the PRNG unless we're in a test environment and not in the browser
   */
  if (inTest()) {
    random = pseudoRandom();
    random.seed(seed);
    return () => random.get();
  }

  // eslint-disable-next-line ban/ban
  return () => Math.random();
};

// The number 56434354 is just a random number that I picked by mashing keys.
// It is ignored outside of test environments
export const generateRandomNumber = getRNG(56434354);
