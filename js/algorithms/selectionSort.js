// --- Selection Sort ---
// Time Complexity: O(n²) | Space: O(1)

export function selectionSort(array) {
  const arr   = [...array];
  const steps = [];
  const n     = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      // Compare current element with running minimum
      steps.push({ type: "compare", i: minIdx, j });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      // Swap minimum into sorted position
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({ type: "swap", i, j: minIdx });
    }

    steps.push({ type: "mark-sorted", i });
  }

  steps.push({ type: "mark-sorted", i: n - 1 });

  return steps;
}

export const timeComplexity = {
  best: "O(n²)",
  worst: "O(n²)",
  average: "O(n²)",
  space: "O(1)"
};