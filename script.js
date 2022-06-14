let player1Element = document.querySelector(".player-1");
let player2Element = document.querySelector(".player-2");
let score1Element = document.querySelector(".player-1 .score");
let score2Element = document.querySelector(".player-2 .score");
let current1Element = document.querySelector(".player-1 .current-score");
let current2Element = document.querySelector(".player-2 .current-score");

let diceImage = document.querySelector(".dice-image");

let btnNew = document.querySelector(".btn-new");
let btnRoll = document.querySelector(".btn-roll");
let btnHold = document.querySelector(".btn-hold");

let finalScoreInput = document.getElementById("final-score");

let activePlayer, currentScore, totalScores, playing;

const newGame = () => {
  activePlayer = 1;
  currentScore = 0;
  totalScores = [0, 0];
  playing = true;

  player1Element.classList.add("player-active");
  player2Element.classList.remove("player-active");
  player1Element.classList.remove("player-winner");
  player2Element.classList.remove("player-winner");

  score1Element.textContent = "0";
  score2Element.textContent = "0";
  current1Element.textContent = "0";
  current2Element.textContent = "0";

  diceImage.classList.add("hidden");

  btnHold.removeAttribute("disabled");
  btnRoll.removeAttribute("disabled");

  btnNew.classList.remove("hover");
};

const switchPlayer = () => {
  document.getElementById(`current-score-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  currentScore = 0;
  diceImage.src = `images/dice_1.svg`;
  player1Element.classList.toggle("player-active");
  player2Element.classList.toggle("player-active");
};

window.addEventListener("load", newGame);
btnNew.addEventListener("click", newGame);

btnRoll.addEventListener("click", () => {
  if (playing) {
    let rand = Math.floor(Math.random() * 6) + 1;

    diceImage.classList.remove("hidden");
    diceImage.src = `images/dice_${rand}.svg`;

    if (rand != 1) {
      currentScore += rand;
      document.getElementById(`current-score-${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    totalScores[activePlayer - 1] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent = totalScores[activePlayer - 1];

    let finalScore = finalScoreInput.value || 30;

    if (totalScores[activePlayer - 1] >= finalScore) {
      playing = false;
      diceImage.classList.add("hidden");

      document.querySelector(`.player-${activePlayer}`).classList.add("player-winner");
      document.querySelector(`.player-${activePlayer}`).classList.remove("player-active");

      btnHold.setAttribute("disabled", "disabled");
      btnRoll.setAttribute("disabled", "disabled");

      btnNew.classList.add("hover");
    } else {
      switchPlayer();
    }
  }
});

finalScoreInput.onblur = () => {
  if (finalScoreInput.value > 300 || finalScoreInput.value < 10) {
    finalScoreInput.value = 30;
  }
  finalScoreInput.nextElementSibling.classList.add("hidden");
};
finalScoreInput.onfocus = () => {
  finalScoreInput.nextElementSibling.classList.remove("hidden");
};
