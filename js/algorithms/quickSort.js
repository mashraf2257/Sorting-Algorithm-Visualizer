// --- Quick Sort ---
// Produces step instructions only. No DOM manipulation.
// Uses Lomuto partition scheme with last element as pivot.
// Time Complexity: O(n log n) avg | O(n²) worst | Space: O(log n)

export function quickSort(array) {
  const arr   = [...array];
  const steps = [];

  quickSortRecursive(arr, 0, arr.length - 1, steps);

  // Mark all sorted after recursion completes
  for (let i = 0; i < arr.length; i++) {
    steps.push({ type: "mark-sorted", i });
  }

  return steps;
}

function quickSortRecursive(arr, low, high, steps) {
  if (low < high) {
    const pivotIdx = partition(arr, low, high, steps);
    quickSortRecursive(arr, low, pivotIdx - 1, steps);
    quickSortRecursive(arr, pivotIdx + 1, high, steps);
  }
}

function partition(arr, low, high, steps) {
  const pivot = arr[high]; // Lomuto: pivot = last element
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // Compare current element with pivot
    steps.push({ type: "compare", i: j, j: high });

    if (arr[j] <= pivot) {
      i++;
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ type: "swap", i, j });
      }
    }
  }

  // Place pivot in its correct sorted position
  if (i + 1 !== high) {
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({ type: "swap", i: i + 1, j: high });
  }

  return i + 1;
}

export const timeComplexity = "O(n log n)";
