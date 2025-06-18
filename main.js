const modes = { easy: 3, hard: 6 };
let currentMode = "hard";
let colors = [];
let pickedColor = "";
let squares = [];
let isGameOver = false;

const colorDisplay = document.getElementById("colorDisplay");
const squareContainer = document.getElementById("squareContainer");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset");
const easyBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");
const header = document.getElementById("header");

main();

function main() {
  setupModeButtons();
  setupResetButton();
  setupSquares(modes[currentMode]);
  reset();
}

function setupModeButtons() {
  easyBtn.addEventListener("click", () => {
    currentMode = "easy";
    toggleSelectedButton(easyBtn);
    reset();
  });

  hardBtn.addEventListener("click", () => {
    currentMode = "hard";
    toggleSelectedButton(hardBtn);
    reset();
  });
}

function setupResetButton() {
  resetButton.addEventListener("click", reset);
}

function setupSquares(num) {
  squareContainer.innerHTML = ""; // clear old squares
  for (let i = 0; i < num; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener("click", () => handleSquareClick(square));
    squareContainer.appendChild(square);
  }
  squares = document.querySelectorAll(".square");
}

function handleSquareClick(square) {
  if (isGameOver) return;

  const clickedColor = square.style.backgroundColor;
  if (clickedColor === pickedColor) {
    messageDisplay.textContent = "🎉 Correct!";
    header.style.backgroundColor = pickedColor;
    squares.forEach((sq) => {
      sq.style.backgroundColor = pickedColor;
      sq.classList.add("disabled");
    });
    isGameOver = true;
    resetButton.textContent = "Play Again?";
  } else {
    square.style.backgroundColor = "#232323";
    square.classList.add("disabled");
    messageDisplay.textContent = "❌ Try Again!";
  }
}

function reset() {
  isGameOver = false;
  colors = generateRandomColors(modes[currentMode]);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  header.style.backgroundColor = "steelblue";
  resetButton.textContent = "New Colors";

  setupSquares(modes[currentMode]);
  squares.forEach((square, i) => {
    square.style.backgroundColor = colors[i];
    square.classList.remove("disabled");
  });
}

function toggleSelectedButton(selectedBtn) {
  easyBtn.classList.remove("selected");
  hardBtn.classList.remove("selected");
  selectedBtn.classList.add("selected");
}

function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
