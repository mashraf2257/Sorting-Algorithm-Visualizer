// --- Merge Sort ---
// Time Complexity: O(n log n) | Space: O(n)

export function mergeSort(array) {
  const arr   = [...array];
  const steps = [];

  mergeSortRecursive(arr, 0, arr.length - 1, steps);

  // Mark every index sorted after the full merge completes
  for (let i = 0; i < arr.length; i++) {
    steps.push({ type: "mark-sorted", i });
  }

  return steps;
}

function mergeSortRecursive(arr, left, right, steps) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  mergeSortRecursive(arr, left, mid, steps);
  mergeSortRecursive(arr, mid + 1, right, steps);
  merge(arr, left, mid, right, steps);
}

function merge(arr, left, mid, right, steps) {
  // Auxiliary sub-arrays
  const leftArr  = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    // Compare heads of each sub-array
    steps.push({ type: "compare", i: left + i, j: mid + 1 + j });

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      steps.push({ type: "overwrite", i: k, value: leftArr[i] });
      i++;
    } else {
      arr[k] = rightArr[j];
      steps.push({ type: "overwrite", i: k, value: rightArr[j] });
      j++;
    }
    k++;
  }

  // Drain remaining elements
  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    steps.push({ type: "overwrite", i: k, value: leftArr[i] });
    i++; k++;
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    steps.push({ type: "overwrite", i: k, value: rightArr[j] });
    j++; k++;
  }
}