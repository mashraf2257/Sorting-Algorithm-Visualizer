// --- Array Generator ---
// Responsible for producing the initial unsorted array values.
// Does NOT touch the DOM.

import { randomInt } from "../utils/helpers.js";

// Generates `size` random integers in [5, 100] (used as heights in %).
export function generateArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(randomInt(5, 100));
  }
  return arr;
}
