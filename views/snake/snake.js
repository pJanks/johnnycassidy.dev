// board dimensions are 600px x 350px
// each snake piece is 10px x 10px

const startOrResetButton = document.querySelector('.start-or-reset-game-button');
const viewInstructionsButton = document.querySelector('.view-instructions-button');
const closeInstructionsButton = document.querySelector('.close-instructions-button');
const viewHiScoresButton = document.querySelector('.view-hi-scores-button');
const closeHiScoresButton = document.querySelector('.close-hi-scores-button');
const instructionsModal = document.querySelector('.game-instructions-modal');
const hiScoresModal = document.querySelector('.hi-scores-modal');
const gameOverModal = document.querySelector('.game-over-modal');
const finalScore = document.querySelector('.final-score');
const timer = document.querySelector('.timer');
const snakeBoard = document.querySelector('.snake-game-canvas');

snakeBoard.addEventListener('keydown', (e) => setVelocities(e));
startOrResetButton.addEventListener('click', (e) => handleStartOrResetButtonClick(e));
closeInstructionsButton.addEventListener('click', () => toggleModals(instructionsModal));
viewInstructionsButton.addEventListener('click', () => toggleModals(instructionsModal));
viewHiScoresButton.addEventListener('click', () => toggleModals(hiScoresModal, true));
closeHiScoresButton.addEventListener('click', () => toggleModals(hiScoresModal));

// prevent a user from navigating out of canvas range
snakeBoard.addEventListener('blur', () => running ? snakeBoard.focus() : null);

// create a two dimensional drawing context
const snakeBoardContext = snakeBoard.getContext('2d');

// declare empty variables to determine different states of gameplay
let running = false,
winner = false,
loser = false,
reset = false,
score = 0,
timeout = 100,
points = 100,
keyClicked = false,
turn = 0,
hours = 0,
minutes = 0,
seconds = 0,
hiScores = [],
pillXValue,
pillYValue,
interval;

// create and print a table to the console of all default settings onload
const initialTableObject = {
  intervalRunsIn: `${timeout} ms`,
  nextPillIsWorth: points,
  score,
  turn,
};

onload = console.table(initialTableObject);

const makeNetworkRequest = async (url, options = {}) => {
  const response = await fetch(url, options);
  const parsedResponse = await response.json();
  return parsedResponse;
}

// pad time with zeros if less than 10
const padTime = (unit) => (unit < 10 ? '0' : '') + unit;

const adjustTimes = () => {
  seconds++

  if (seconds === 60) {
    minutes++;
    seconds = 0;
    points += 3;
    console.log('extra points added for a minute');
  }

  if (minutes === 60) {
    hours++;
    minutes = 0;
    seconds = 0;
    points += 13;
    console.log('extra points added for an hour');
  }

  timer.innerText = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
}

let pillColor = '#F00';

const boardBackground = '#000';
const snakeColor = '#28BD00';

// initial snake state for reuse on reset
// snake always begins in the middle of the board
const getInitialSnake = () => [
  { x: 300, y: 180 },
  { x: 290, y: 180 },
  { x: 280, y: 180 },
  { x: 270, y: 180 },
  { x: 260, y: 180 },
];

let snake = getInitialSnake();

// horizontal velocity, snake begins moving at ten pixels to the right
let xVelocity = 10;

// vertical velocity
let yVelocity = 0;

// update velocities based on keypresses
// the conditions make sure that you can't move backwards into your self
// the keyClicked is used to make sure you cant choose another direction
// until after the next render of the game
const setVelocities = (e) => {
  if (!keyClicked) {
    keyClicked = true;
    if (!xVelocity && e.key.toLowerCase() === 'a') {
      xVelocity = -10;
      yVelocity = 0;
    } else if (!xVelocity && e.key.toLowerCase() === 'd') {
      xVelocity = 10;
      yVelocity = 0;
    } else if (!yVelocity && e.key.toLowerCase() === 'w') {
      xVelocity = 0;
      yVelocity = -10;
    } else if (!yVelocity && e.key.toLowerCase() === 's') {
      xVelocity = 0;
      yVelocity = 10;
    }
  }
}

const handleStartOrResetButtonClick = (e) => {
  if (e.target.innerText.toLowerCase() === 'reset') {
    location.reload();
  }

  instructionsModal.classList.add('hidden');
  e.target.innerText = 'Reset';

  interval = setInterval(adjustTimes, 1000);

  snakeBoard.focus();

  viewInstructionsButton.disabled = true;
  viewHiScoresButton.disabled = true;

  runGame();
  running = true;
}

const toggleModals = async (modal, fetchScores = false) => {
  if (fetchScores) {
    hiScores = await makeNetworkRequest('/backend/get_scores.php');
    populateHiScores();
  }
  modal.classList.contains('hidden') ? modal.classList.remove('hidden') : modal.classList.add('hidden');
};

const clearCanvas = () => {
  snakeBoardContext.fillStyle = boardBackground;
  snakeBoardContext.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
  snakeBoardContext.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}

// Draw the snake on the canvas
const drawSnake = () => {
  for (let i = 0; i < snake.length; i++) {
    !i ? snakeBoardContext.fillStyle = '#FF0' : snakeBoardContext.fillStyle = snakeColor;
    snakeBoardContext.fillRect(snake[i].x, snake[i].y, 10, 10);
    snakeBoardContext.strokeRect(snake[i].x, snake[i].y, 10, 10);
  }
}

const moveSnake = () => {  

  // check for collision with walls
  if (snake[0].x + xVelocity === -10 || snake[0].x + xVelocity === 600 || snake[0].y + yVelocity === -10 || snake[0].y + yVelocity === 350) {
    loser = true;
    running = false;
    clearInterval(interval);
    return;
  }

  // where the snake will be next
  const head = {
    x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity,
  };

  checkForTailCollision(head);

  if (checkForPillCollision(head)) {
    populatePill();
  } else {
    snake.unshift(head);
    snake.pop();
  }
}

const runGame = (e) => {
  if (loser) {
    gameOverModal.classList.remove('hidden');
    finalScore.innerText = score;

    if (!hiScores[9] || score > Number(hiScores[9].score)) {
      const name = prompt(`
        Congrats, You\'ve scored in the top 10!!
        Please enter an identifier:
      `);
      const time = timer.innerText;
      insertHiScore(score, name ? name : 'anonymous', time);
    }
    
    snakeBoardContext.clearRect(0, 0, snakeBoard.width, snakeBoard.height);
    loser = false;
  } else {
    setTimeout(() => {
      keyClicked = false;
      clearCanvas();
      populatePill(pillXValue, pillYValue);
      moveSnake();
      drawSnake();
      runGame();
    }, timeout);
  }
}

const populatePill = async (x = null, y = null) => {
  let pillIsOnOrAroundSnake = false;
  if (!x || !y) {

    // get random 10x10 blocks on the canvas for pill placement
    // add five to center the pill in the square on the grid
    possibleX = Math.random() * 60 + 5
    possibleY = Math.random() * 35 + 5
    
    // make sure the random coordinates are not on top of the snake
    for (let i = 0; i < snake.length; i++) {
      if (possibleX * 10 - snake[i].x <= 5 && possibleX * 10 - snake[i].x >= -5 && possibleY * 10 - snake[i].y <= 5 && possibleY * 10 - snake[i].y >= -5) {
        pillIsOnOrAroundSnake = true;
      }
    }

    // make sure random coordinates are not off the border
    if (possibleX * 10 < 5 || possibleX * 10 > 595 || possibleY * 10 < 5 || possibleY * 10 > 345 || pillIsOnOrAroundSnake) {
      populatePill();
      return;
    }

    // scale values to actual columns and rows
    pillXValue = Math.round(possibleX) * 10 + 5;
    pillYValue = Math.round(possibleY) * 10 + 5;
  }

  // draw pills
  snakeBoardContext.beginPath();
  snakeBoardContext.ellipse(pillXValue, pillYValue, 5 , 5, Math.PI / 4, 0, 2 * Math.PI);
  snakeBoardContext.stroke();
  snakeBoardContext.fillStyle = pillColor;
  snakeBoardContext.fill();
  snakeBoardContext.closePath();
}

const populateHiScores = () => {
  for (let i = 0; i < 10; i++) {
    const hiScore = hiScores[i] ?? { name: 'EMPTY', score: '0', time: '00:00:00' };
    const hiScoreRow = document.querySelector(`.table-data-${i}`);
    hiScoreRow.innerText = `${i + 1}. ${hiScore.name} - ${hiScore.score} - ${hiScore.time}`;
  }
}

const checkForPillCollision = (head) => {
  if ((xVelocity && head.x + 5 === pillXValue) && head.y + 5 === pillYValue || (yVelocity && head.y + 5 === pillYValue) && head.x + 5 === pillXValue) {

    pillColor === '#F00' ? pillColor = '#00F' : pillColor = '#F00';

    snake.unshift(head);

    score += points;
    points++;
    turn++;
    timeout = Number((timeout - .04).toFixed(2));

    const tableObject = {
      intervalRunsIn: `${timeout} ms`,
      nextPillIsWorth: points,
      score,
      turn,
    };
    console.table(tableObject);
    return true;
  }
}

const checkForTailCollision = (head) => {
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      loser = true;
      clearInterval(interval);
    }
  }
}

const insertHiScore = (score, name, time) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ score, name, time }),
    'content-type': 'application/json',
  }
  makeNetworkRequest('/backend/insert_scores.php', options);
}

drawSnake();
populatePill();