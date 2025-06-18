const difficultyMap = { easy: 3, hard: 6 };
let currentDifficulty = "hard";
let correctColor = "";
let gameEnded = false;

const colorLabel = document.getElementById("colorDisplay");
const grid = document.getElementById("squareContainer");
const feedback = document.getElementById("message");
const newColorBtn = document.getElementById("reset");
const easyModeBtn = document.getElementById("easyBtn");
const hardModeBtn = document.getElementById("hardBtn");
const headerBar = document.getElementById("header");

initGame();

function initGame() {
  attachModeEvents();
  newColorBtn.addEventListener("click", startNewRound);
  startNewRound();
}

function attachModeEvents() {
  easyModeBtn.onclick = () => changeDifficulty("easy");
  hardModeBtn.onclick = () => changeDifficulty("hard");
}

function changeDifficulty(mode) {
  currentDifficulty = mode;
  easyModeBtn.classList.toggle("selected", mode === "easy");
  hardModeBtn.classList.toggle("selected", mode === "hard");
  startNewRound();
}

function startNewRound() {
  gameEnded = false;
  const boxCount = difficultyMap[currentDifficulty];
  const colorList = Array.from({ length: boxCount }, generateRandomRGB);
  correctColor = selectTargetColor(colorList);

  colorLabel.textContent = correctColor;
  feedback.textContent = "";
  headerBar.style.backgroundColor = "steelblue";
  newColorBtn.textContent = "New Colors";

  renderColorBoxes(colorList);
}

function renderColorBoxes(colorArray) {
  grid.innerHTML = "";

  colorArray.forEach((color) => {
    const box = document.createElement("div");
    box.style.backgroundColor = color;
    box.dataset.rgb = color;
    box.style.cursor = "pointer";
    box.setAttribute("tabindex", 0); // optional: keyboard accessibility
    box.className = "square";

    box.onclick = () => processGuess(box);
    grid.appendChild(box);
  });
}

function processGuess(box) {
  if (gameEnded) return;

  const chosenColor = box.dataset.rgb;
  if (chosenColor === correctColor) {
    feedback.textContent = "🎉 Correct!";
    headerBar.style.backgroundColor = correctColor;
    updateAllBoxes(correctColor);
    gameEnded = true;
    newColorBtn.textContent = "Play Again?";
  } else {
    box.style.backgroundColor = "#232323";
    box.style.pointerEvents = "none";
    box.style.opacity = 0.5;
    feedback.textContent = "❌ Try Again!";
  }
}

function updateAllBoxes(color) {
  const allBoxes = grid.querySelectorAll("[data-rgb]");
  allBoxes.forEach((box) => {
    box.style.backgroundColor = color;
    box.style.pointerEvents = "none";
    box.style.opacity = 1;
  });
}

function generateRandomRGB() {
  const random = () => Math.floor(Math.random() * 256);
  return `rgb(${random()}, ${random()}, ${random()})`;
}

function selectTargetColor(colors) {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
