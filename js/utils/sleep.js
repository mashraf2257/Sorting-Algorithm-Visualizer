// --- Sleep Utility ---
// Returns a promise that resolves after `ms` milliseconds.
// Used by the animator to pace step playback.

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}