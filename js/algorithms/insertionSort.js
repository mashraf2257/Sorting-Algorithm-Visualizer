// --- Insertion Sort ---
// Time Complexity: O(n²) worst | O(n) best | Space: O(1)

export function insertionSort(array) {
  const arr   = [...array];
  const steps = [];
  const n     = arr.length;

  steps.push({ type: "mark-sorted", i: 0 });

  for (let i = 1; i < n; i++) {
    let j = i;

    while (j > 0) {
      // Compare current with previous
      steps.push({ type: "compare", i: j - 1, j });

      if (arr[j] < arr[j - 1]) {
        // Shift left
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        steps.push({ type: "swap", i: j, j: j - 1 });
        j--;
      } else {
        break;
      }
    }

    steps.push({ type: "mark-sorted", i: j });
  }

  return steps;
}
export const timeComplexity = "O(n²)";
