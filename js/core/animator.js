// --- Animator ---
// SOLE authority over DOM mutations during sorting:
//   - bar height changes
//   - bar color changes
//   - animation timing
//   - live counter updates in the UI

import { sleep }                          from "../utils/sleep.js";
import { getBarAt, COLORS }               from "./renderer.js";
import {
  getDelay, isPaused,
  incrementComparisons, incrementSwaps,
  getComparisons, getSwaps,
} from "./state.js";

// --- UI element references (set once by main.js via init) ---
let container       = null;
let comparisonsEl   = null;
let swapsEl         = null;
let statusDotEl     = null;
let statusTextEl    = null;

// Receives DOM references from main.js so animator stays decoupled from selectors.
export function initAnimator(refs) {
  container       = refs.container;
  comparisonsEl   = refs.comparisonsEl;
  swapsEl         = refs.swapsEl;
  statusDotEl     = refs.statusDotEl;
  statusTextEl    = refs.statusTextEl;
}

// --- Pause support ---
// When isPaused() is true, we spin-wait until resumed.
async function waitIfPaused() {
  while (isPaused()) {
    await sleep(100);
  }
}

// --- Step Dispatcher ---
// Plays a single step instruction returned by an algorithm module.
export async function playStep(step) {
  await waitIfPaused();

  switch (step.type) {
    case "compare": await handleCompare(step); break;
    case "swap":    await handleSwap(step);    break;
    case "overwrite": await handleOverwrite(step); break;
    case "mark-sorted": markSorted(step); break;
  }

  // Update live counters in the UI after every step
  updateCounterDisplay();
}

// --- Step Handlers ---

async function handleCompare({ i, j }) {
  const barI = getBarAt(container, i);
  const barJ = getBarAt(container, j);

  // Highlight both bars as active
  setColor(barI, COLORS.active);
  setColor(barJ, COLORS.active);

  incrementComparisons();

  // Brief flash, then reset to default
  await sleep(getDelay());
  setColor(barI, COLORS.default);
  setColor(barJ, COLORS.default);
}

async function handleSwap({ i, j }) {
  const barI = getBarAt(container, i);
  const barJ = getBarAt(container, j);

  // Swap the visual heights
  const tempHeight  = barI.style.height;
  barI.style.height = barJ.style.height;
  barJ.style.height = tempHeight;

  // Flash amber during swap
  setColor(barI, COLORS.active);
  setColor(barJ, COLORS.active);

  incrementSwaps();

  await sleep(getDelay());
  setColor(barI, COLORS.default);
  setColor(barJ, COLORS.default);
}

async function handleOverwrite({ i, value }) {
  const bar = getBarAt(container, i);
  bar.style.height = `${value}%`;

  setColor(bar, COLORS.active);
  incrementSwaps();

  await sleep(getDelay());
  setColor(bar, COLORS.default);
}

function markSorted({ i }) {
  const bar = getBarAt(container, i);
  setColor(bar, COLORS.sorted);
}

// --- Helpers ---

function setColor(bar, colorClass) {
  bar.className = bar.className
    .replace(/bg-\S+/g, "")
    .trim();
  bar.className += ` ${colorClass}`;
}

function updateCounterDisplay() {
  if (comparisonsEl) comparisonsEl.textContent = getComparisons().toLocaleString();
  if (swapsEl)       swapsEl.textContent       = getSwaps().toLocaleString();
}

// Marks ALL bars sorted — called after the algorithm finishes.
export function markAllSorted() {
  const bars = container.children;
  for (const bar of bars) {
    setColor(bar, COLORS.sorted);
  }
}

// Sets the status indicator text & dot color in the canvas header.
export function setStatus(text, isActive = false) {
  if (statusTextEl) statusTextEl.textContent = text;
  if (statusDotEl) {
    statusDotEl.className = statusDotEl.className
      .replace(/bg-\S+/g, "")
      .trim();
    statusDotEl.className += isActive ? " bg-tertiary" : " bg-secondary";
  }
}
