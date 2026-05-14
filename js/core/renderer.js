// --- Renderer ---
// Sole responsibility: render bar elements into #array-container.
// All DOM creation for the initial array lives here.

// Color tokens mapped from the Stitch design system
const COLORS = {
  default: "bg-outline",
  active:  "bg-tertiary",
  sorted:  "bg-secondary",
};

// Clears #array-container and renders one bar per array value.
export function renderBars(array, container) {
  container.innerHTML = "";

  const total = array.length;

  array.forEach((value) => {
    const bar = document.createElement("div");

    // Base Tailwind classes matching the Stitch UI bar style
    bar.className = `${COLORS.default} flex-grow max-w-[12px] transition-colors duration-100`;
    bar.style.height = `${value}%`;

    container.appendChild(bar);
  });
}

// Returns the bar element at a given index inside the container.
export function getBarAt(container, index) {
  return container.children[index];
}

// Exports color tokens so animator.js can apply them without redefining.
export { COLORS };
