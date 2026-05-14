// --- Bubble Sort ---
// Time Complexity: O(n²) | Space: O(1)

export function bubbleSort(array) {
  const arr   = [...array];
  const steps = [];
  const n     = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      steps.push({ type: "compare", i: j, j: j + 1 });

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ type: "swap", i: j, j: j + 1 });
      }
    }
    // Mark the largest element of this pass as sorted
    steps.push({ type: "mark-sorted", i: n - 1 - i });
  }

  // Mark the final remaining element
  steps.push({ type: "mark-sorted", i: 0 });

  return steps;
}
export const timeComplexity = "O(n²)";
