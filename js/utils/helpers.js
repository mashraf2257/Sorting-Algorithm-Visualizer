// --- Helpers ---
// Shared utility functions used across the project.

// Returns a random integer in [min, max] inclusive.
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Produces a shallow-copied array with elements shuffled in place (Fisher-Yates).
export function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
