# 📊 Sorting Algorithm Visualizer

An interactive, client-side web application designed to visualize the execution of fundamental sorting algorithms. Built with a strict modular JavaScript architecture, the system provides step-by-step animations, real-time performance metrics, and algorithmic complexity analysis entirely within the browser — no backend server required.

## ✨ Features

* **👀 Interactive Visualization** - Watch algorithms process data in real-time with color-coded states (Unsorted, Active, Sorted).
* **📈 Real-Time Metrics** - Tracks and displays exact comparison and swap/data movement counts during execution.
* **⏱️ Complexity Analysis** - Dynamically updates the theoretical Big-O Best, Worst, Average, and Space complexities based on the selected algorithm.
* **🎛️ Simulation Controls** - Generate new random arrays, adjust array size (5-200 elements), modify playback speed, and pause/resume or reset the simulation mid-flight.
* **🧩 Modular Architecture** - Strict separation of concerns keeping DOM manipulation entirely decoupled from the pure mathematical sorting logic.

## 🛠️ Technology Stack

* **Core Logic**: Vanilla ES6 JavaScript (Modules)
* **Frontend Structure**: HTML5, CSS3
* **Styling**: Tailwind CSS (CDN), Google Fonts (Geist, JetBrains Mono), Material Symbols
* **Architecture Pattern**: Client-side execution with separate State, Renderer, and Animator controllers.

## 🧮 Implemented Algorithms

| Algorithm | File | Time Complexity (Avg) | Space Complexity |
| --- | --- | --- | --- |
| Bubble Sort | `bubbleSort.js` | O(n²) | O(1) |
| Selection Sort | `selectionSort.js` | O(n²) | O(1) |
| Insertion Sort | `insertionSort.js` | O(n²) | O(1) |
| Merge Sort | `mergeSort.js` | O(n log n) | O(n) |
| Quick Sort | `quickSort.js` | O(n log n) | O(log n) |

## 📁 Project Structure

```text
Sorting-Algorithm-Visualizer/
├── index.html                 # Main single-page application
├── style.css                  # Scrollbar overrides and custom font settings
└── js/
    ├── main.js                # Entry point, UI event wiring, and bootstrap
    ├── core/
    │   ├── animator.js        # Handles all DOM mutations and step playback
    │   ├── array.js           # Generates initial random data sets
    │   ├── renderer.js        # Renders the initial bar elements
    │   └── state.js           # Single source of truth for runtime state
    ├── algorithms/            # Pure mathematical sorting logic (returns step instructions)
    │   ├── bubbleSort.js
    │   ├── insertionSort.js
    │   ├── mergeSort.js
    │   ├── quickSort.js
    │   └── selectionSort.js
    └── utils/
        ├── helpers.js         # Math and array utilities
        └── sleep.js           # Promise-based delay for animation pacing

```

## 🚀 Getting Started

### Prerequisites

* A modern web browser (Chrome, Edge, Firefox, Safari)
* A local development server to bypass strict browser CORS policies for ES6 modules.

### Clone Project

```bash
git clone https://github.com/mashraf2257/Sorting-Algorithm-Visualizer.git
cd Sorting-Algorithm-Visualizer

```

### Option 1: Live Server (Recommended)

1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` in the explorer.
4. Click **"Open with Live Server"**.

### Option 2: Python Server

If you have Python installed, you can serve the directory directly from your terminal:

```bash
python -m http.server 8000

```

Then open `http://localhost:8000` in your web browser.

## 📖 Usage

* **Algorithm Selection** — Choose between Bubble, Selection, Insertion, Merge, or Quick Sort from the sidebar dropdown.
* **Parameters** — Use the sliders to adjust the amount of data (Array Size) and the animation delay (Sorting Speed).
* **Execution** — Click **RUN SIMULATION** to begin. You can **PAUSE** or **RESET** the visualizer at any time.

## 👨‍💻 Developer

* Mohamed Ashraf

## 📄 License

This project is developed as part of a university course.