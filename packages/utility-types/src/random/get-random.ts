import { generateRandomNumber } from "./generate-random-number.js";

// This is a wrapper around the random number generator to make it easier to mock in tests
// It should be used instead of Math.random in all places

export const getRandom = () => generateRandomNumber();
