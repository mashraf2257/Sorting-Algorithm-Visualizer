// --- Global State ---
// Single source of truth for all mutable runtime state.

const state = {
  // Current array of numeric values being sorted
  array: [],

  // Currently selected algorithm key (e.g. "bubble")
  algorithm: "bubble",

  // Animation delay in milliseconds (derived from speed slider)
  animationDelay: 50,

  // Whether a sort is currently running
  isRunning: false,

  // Whether the animation is paused mid-run
  isPaused: false,

  // Live counters updated by the animator
  comparisons: 0,
  swaps: 0,
};

// --- Getters ---

export function getArray()         { return state.array; }
export function getAlgorithm()     { return state.algorithm; }
export function getDelay()         { return state.animationDelay; }
export function isRunning()        { return state.isRunning; }
export function isPaused()         { return state.isPaused; }
export function getComparisons()   { return state.comparisons; }
export function getSwaps()         { return state.swaps; }

// --- Setters ---

export function setArray(arr)          { state.array = arr; }
export function setAlgorithm(alg)      { state.algorithm = alg; }
export function setDelay(ms)           { state.animationDelay = ms; }
export function setRunning(val)        { state.isRunning = val; }
export function setPaused(val)         { state.isPaused = val; }

export function incrementComparisons() { state.comparisons++; }
export function incrementSwaps()       { state.swaps++; }

export function resetCounters() {
  state.comparisons = 0;
  state.swaps = 0;
}
