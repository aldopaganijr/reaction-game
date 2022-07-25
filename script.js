const clickArea = document.querySelector(".box");
const displayText = document.querySelector(".text");
const scoreElements = document.querySelectorAll(".score");

const scoreHistory = [];

const MINIMUM_MS_TILL_CHANGE = 3000;
const MAXIMUM_MS_TILL_CHANGE = 10000;

let msSinceEpochOnTimeout = 0;
let waitingForClick = false;

function play() {
  const msTillChange =
    Math.floor(
      Math.random() * (MAXIMUM_MS_TILL_CHANGE - MINIMUM_MS_TILL_CHANGE)
    ) + MINIMUM_MS_TILL_CHANGE;

 
  clickArea.style.backgroundColor = null;

  displayText.textContent = "Get Ready!";

  setTimeout(() => {
    msSinceEpochOnTimeout = Date.now();

    clickArea.style.backgroundColor = "#025041";
    waitingForClick = true;
  }, msTillChange);
}

function addScore(score) {

  scoreHistory.unshift(score);

  for (let i = 0; i < Math.min(scoreHistory.length, 10); i++) {
    const score = scoreHistory[i];

    scoreElements[i].textContent = `${score} ms`;
  }
}

clickArea.addEventListener("click", () => {
  if (waitingForClick) {
    const score = Date.now() - msSinceEpochOnTimeout;

    waitingForClick = false;
    displayText.textContent = `Your time was ${score} ms! Click to play again.`;

    addScore(score);
  } else {
    play();
  }
});
