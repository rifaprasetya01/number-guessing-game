const startBtn = document.getElementById('startGame');
const shuffleNumberBtn = document.getElementById('shuffleNumber');

const fieldInput = document.getElementById('userAnswerField');
const fieldOutput = document.getElementById('userAnswerOutput');
const sendGuessBtn = document.getElementById('sendAnswer');

const historyListContainer = document.getElementById('historyContent');
const attemptsContainer = document.getElementById('totalTryError');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guessTheNumberGame() {
  // Initial
  fieldInput.value = '';
  fieldInput.disabled = false;
  fieldOutput.innerHTML = 'Started!';
  sendGuessBtn.disabled = false;
  sendGuessBtn.style.cursor = 'pointer';
  sendGuessBtn.innerHTML = 'Kirim';
  attemptsContainer.innerHTML = '0';
  historyListContainer.innerHTML = '';

  // Play the Games

  let isRunning = true;

  const MIN_NUMBER = 1;
  const MAX_NUMBER = 100;
  const CORRECT_VALUE = getRandomNumber(MIN_NUMBER, MAX_NUMBER);
  console.log(CORRECT_VALUE);

  let attempts = 0;

  let historyListItem = '';
  const historyItemElement = (attempts, userGuess, message) => {
    return `<li class="history-item">${attempts}: ${userGuess} ${message}</li>`;
  };
  const addItemToHistoryContainerHandler = (message) => {
    attemptsContainer.innerHTML = attempts;
    historyListItem += historyItemElement(attempts, userAnswer, message);
  };

  let userAnswer;

  fieldInput.addEventListener('input', (e) => {
    const inputValue = e.target.value;

    if (inputValue < 1 || inputValue > 100) {
      fieldOutput.innerHTML = 'Error';
    } else {
      fieldOutput.innerHTML = inputValue;
    }
    userAnswer = parseInt(inputValue);
  });

  sendGuessBtn.addEventListener('click', () => {
    if (isRunning) {
      if (userAnswer > 0 || userAnswer < 101) {
        if (userAnswer === CORRECT_VALUE) {
          fieldOutput.innerHTML = 'Benar!';
          attempts += 1;
          addItemToHistoryContainerHandler('Benar');
          isRunning = false;
          fieldInput.disabled = true;
          sendGuessBtn.disabled = true;
          sendGuessBtn.style.cursor = 'auto';
          sendGuessBtn.innerHTML = 'Selesai';
        } else if (userAnswer < CORRECT_VALUE && userAnswer > MIN_NUMBER - 1) {
          fieldOutput.innerHTML = `${userAnswer}>`;
          attempts += 1;
          addItemToHistoryContainerHandler('Terlalu rendah');
        } else if (userAnswer > CORRECT_VALUE && userAnswer < MAX_NUMBER + 1) {
          fieldOutput.innerHTML = `<${userAnswer}`;
          attempts += 1;
          addItemToHistoryContainerHandler('Terlalu tinggi');
        } else {
          fieldOutput.innerHTML = 'Error';
        }
      }
    }

    historyListContainer.innerHTML = historyListItem;
  });
}

window.onload = () => {
  startBtn.addEventListener('click', () => {
    guessTheNumberGame();
  });
  shuffleNumberBtn.addEventListener('click', () => {
    guessTheNumberGame();
  });
};
