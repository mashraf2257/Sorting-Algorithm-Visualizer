// --- Main Entry Point ---
// Bootstraps the application: binds UI controls → state → renderer → animator.
// No sorting logic lives here. No DOM manipulation beyond event wiring.

import { generateArray }   from "./core/array.js";
import { renderBars }      from "./core/renderer.js";
import { initAnimator, playStep, markAllSorted, setStatus } from "./core/animator.js";
import {
  setArray, getArray,
  setAlgorithm, getAlgorithm,
  setDelay, setRunning, setPaused,
  isRunning, isPaused,
  resetCounters,
} from "./core/state.js";

import { bubbleSort,    timeComplexity as bubbleTC    } from "./algorithms/bubbleSort.js";
import { selectionSort, timeComplexity as selectionTC } from "./algorithms/selectionSort.js";
import { insertionSort, timeComplexity as insertionTC } from "./algorithms/insertionSort.js";
import { mergeSort,     timeComplexity as mergeTC     } from "./algorithms/mergeSort.js";
import { quickSort,     timeComplexity as quickTC     } from "./algorithms/quickSort.js";

// --- Algorithm Registry ---
const ALGORITHMS = {
  bubble:    { fn: bubbleSort,    tc: bubbleTC    },
  selection: { fn: selectionSort, tc: selectionTC },
  insertion: { fn: insertionSort, tc: insertionTC },
  merge:     { fn: mergeSort,     tc: mergeTC     },
  quick:     { fn: quickSort,     tc: quickTC     },
};

// --- DOM References ---
const container       = document.getElementById("array-container");
const algorithmSelect = document.getElementById("algorithm-select");
const arraySizeInput  = document.getElementById("array-size");
const speedSlider     = document.getElementById("speed-range");
const generateBtn     = document.getElementById("generate-array-btn");
const startBtn        = document.getElementById("start-btn");
const pauseBtn        = document.getElementById("pause-btn");
const resetBtn        = document.getElementById("reset-btn");

// Stats display elements (located inside the three stat cards)
const comparisonsEl   = document.querySelectorAll(".font-code-sm.text-2xl")[0];
const swapsEl         = document.querySelectorAll(".font-code-sm.text-2xl")[1];
const complexityEl    = document.querySelectorAll(".font-code-sm.text-2xl")[2];

// Canvas status bar
const statusDotEl     = document.querySelector(".w-2.h-2.rounded-full");
const statusTextEl    = document.querySelector(".font-code-sm.text-xs.text-on-surface-variant");

// Array size label was removed in favor of number input.

// --- Initialise Animator with DOM refs ---
initAnimator({ container, comparisonsEl, swapsEl, statusDotEl, statusTextEl });

// --- Speed Mapping ---
// Slider value 1 (slow) → 300ms delay; value 10 (fast) → 5ms delay.
function speedToDelay(sliderValue) {
  const max = 300, min = 5;
  return Math.round(max - ((sliderValue - 1) / 9) * (max - min));
}

// --- Complexity Update ---
function updateAlgorithmMeta(key) {
  const algo = ALGORITHMS[key];
  if (complexityEl) complexityEl.textContent  = algo.tc;
}

// --- Generate & Render Array ---
function generateAndRender() {
  if (isRunning()) return; // block during active sort

  const size  = parseInt(arraySizeInput.value, 10);
  const array = generateArray(size);

  setArray(array);
  resetCounters();
  renderBars(array, container);
  updateCounterDisplay();
  setStatus("READY TO PROCESS", false);
}

// Sync stat card displays after a counter reset.
function updateCounterDisplay() {
  if (comparisonsEl) comparisonsEl.textContent = "0";
  if (swapsEl)       swapsEl.textContent       = "0";
}

// --- Run Sort ---
async function startSort() {
  if (isRunning()) return;

  const key  = getAlgorithm();
  const algo = ALGORITHMS[key];
  const arr  = getArray();

  if (!arr || arr.length === 0) return;

  // Generate steps (pure computation, no DOM)
  const steps = algo.fn(arr);

  setRunning(true);
  setPaused(false);
  updateStartButton(true);
  setStatus("PROCESSING...", true);

  // Play each step through the animator
  for (const step of steps) {
    if (!isRunning()) break; // reset was called
    await playStep(step);
  }

  if (isRunning()) {
    markAllSorted();
    setStatus("SORTED ✓", false);
  }

  setRunning(false);
  setPaused(false);
  updateStartButton(false);
}

// --- Pause / Resume ---
function togglePause() {
  if (!isRunning()) return;

  if (isPaused()) {
    setPaused(false);
    pauseBtn.querySelector("span.material-symbols-outlined").textContent = "pause";
    pauseBtn.childNodes[pauseBtn.childNodes.length - 1].textContent = " PAUSE";
    setStatus("PROCESSING...", true);
  } else {
    setPaused(true);
    pauseBtn.querySelector("span.material-symbols-outlined").textContent = "play_arrow";
    pauseBtn.childNodes[pauseBtn.childNodes.length - 1].textContent = " RESUME";
    setStatus("PAUSED", false);
  }
}

// --- Reset ---
function resetVisualizer() {
  setRunning(false);
  setPaused(false);
  generateAndRender();
  updateStartButton(false);

  // Reset pause button label
  pauseBtn.querySelector("span.material-symbols-outlined").textContent = "pause";
  // Use lastChild to target the text node without touching icon span
  const lastChild = pauseBtn.lastChild;
  if (lastChild && lastChild.nodeType === Node.TEXT_NODE) {
    lastChild.textContent = "\n                        PAUSE\n                    ";
  }
}

// Toggles start button appearance while running.
function updateStartButton(running) {
  const icon = startBtn.querySelector("span.material-symbols-outlined");
  if (running) {
    icon.textContent = "hourglass_top";
    startBtn.disabled = true;
    startBtn.style.opacity = "0.6";
  } else {
    icon.textContent = "play_arrow";
    startBtn.disabled = false;
    startBtn.style.opacity = "1";
  }
}

// --- Event Listeners ---

generateBtn.addEventListener("click", generateAndRender);
startBtn.addEventListener("click", startSort);
pauseBtn.addEventListener("click", togglePause);
resetBtn.addEventListener("click", resetVisualizer);

algorithmSelect.addEventListener("change", (e) => {
  setAlgorithm(e.target.value);
  updateAlgorithmMeta(e.target.value);
});

arraySizeInput.addEventListener("input", (e) => {
  if (!isRunning()) generateAndRender();
});

speedSlider.addEventListener("input", (e) => {
  setDelay(speedToDelay(parseInt(e.target.value, 10)));
});

// --- Bootstrap ---
setAlgorithm(algorithmSelect.value);
setDelay(speedToDelay(parseInt(speedSlider.value, 10)));
updateAlgorithmMeta(algorithmSelect.value);
generateAndRender();
