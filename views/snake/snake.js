// board dimensions are 600px x 350px
// each snake piece is 10px x 10px

const closeInstructionsButton = document.querySelector('.close-instructions-button');
const viewInstructionsButton = document.querySelector('.view-instructions-button');
const startOrResetButton = document.querySelector('.start-or-reset-game-button');
const closeHiScoresButton = document.querySelector('.close-hi-scores-button');
const instructionsModal = document.querySelector('.game-instructions-modal');
const closeGameOverButton = document.querySelector('.close-game-over-button');
const viewHiScoresButton = document.querySelector('.view-hi-scores-button');
const hiScoresModal = document.querySelector('.hi-scores-modal');
const gameOverModal = document.querySelector('.game-over-modal');
const snakeBoard = document.querySelector('.snake-game-canvas');
const finalScore = document.querySelector('.final-score');
const timer = document.querySelector('.timer');

closeInstructionsButton.addEventListener('click', () => toggleModals(instructionsModal));
viewInstructionsButton.addEventListener('click', () => toggleModals(instructionsModal));
startOrResetButton.addEventListener('click', (e) => handleStartOrResetButtonClick(e));
closeHiScoresButton.addEventListener('click', () => toggleModals(hiScoresModal));
closeGameOverButton.addEventListener('click', () => toggleModals(gameOverModal));
viewHiScoresButton.addEventListener('click', () => toggleModals(hiScoresModal));
snakeBoard.addEventListener('keydown', (e) => setVelocities(e));

// prevent a user from navigating out of gameboard
snakeBoard.addEventListener('blur', () => running ? snakeBoard.focus() : null);

const snakeBoardContext = snakeBoard.getContext('2d');

// snake always begins in the middle of the board
const snake = [
  { x: 300, y: 180 },
  { x: 290, y: 180 },
  { x: 280, y: 180 },
  { x: 270, y: 180 },
  { x: 260, y: 180 },
];

let pillColor = '#F00',
running = false,
loser = false,
score = 0,
timeout = 100,
points = 100,
keyClicked = false,
pillsEaten = 0,
hours = 0,
minutes = 0,
seconds = 0,
xVelocity = 10,
yVelocity = 0,
hiScores = [],
pillXValue,
pillYValue,
interval;

// create and print a table to the console of defaults
const initialTableObject = {
  intervalRunsIn: `${timeout} ms`,
  nextPillIsWorth: points,
  score,
  pillsEaten,
};

console.table(initialTableObject);

window.onload = async () => {
  hiScores = await makeNetworkRequest('/backend/get_scores.php');
  populateHiScores();
}

const populateHiScores = () => {
  for (let i = 0; i < 10; i++) {
    const hiScore = hiScores[i] ?? {
      name: 'EMPTY',
      score: 0,
      time: '00:00:00',
      pills_eaten: 0,
    };
    const hiScoreRow = document.querySelector(`.table-data-${i}`);
    hiScoreRow.innerText = `${padNumber(i + 1)}. ${hiScore.name} - ${hiScore.score} - ${hiScore.time} - ${hiScore.pills_eaten} pills eaten`;
  }
}

const makeNetworkRequest = async (url, options = {}) => {
  const response = await fetch(url, options);
  const parsedResponse = await response.json();
  return parsedResponse;
}

const padNumber = number => String(number).padStart(2, '0');

const toggleModals = modal => {
  const snakeGameWrapper = document.querySelector('.snake-game-wrapper');

  snakeGameWrapper.classList.toggle('hidden');
  modal.classList.toggle('hidden');
}

const drawSnake = () => {
  snake.forEach((part, i) => {
    !i ? snakeBoardContext.fillStyle = '#FF0' : snakeBoardContext.fillStyle = '#28BD00';
    snakeBoardContext.fillRect(part.x, part.y, 10, 10);
    snakeBoardContext.strokeRect(part.x, part.y, 10, 10);
  });
}

const populatePill = async (x = null, y = null) => {
  let pillIsOnOrAroundSnake = false;
  if (!x || !y) {

    // get random 10x10 blocks on the canvas for pill placement
    // add five to center the pill in the square on the grid
    const possibleX = Math.random() * 60 + 5;
    const possibleY = Math.random() * 35 + 5;
    
    // make sure the random coordinates are not on top of the snake
    snake.forEach(part => {
      if (possibleX * 10 - part.x <= 5 && possibleX * 10 - part.x >= -5 && possibleY * 10 - part.y <= 5 && possibleY * 10 - part.y >= -5) {
        pillIsOnOrAroundSnake = true;
      }
    });

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

const handleStartOrResetButtonClick = (e) => {
  if (e.target.innerText.toLowerCase() !== 'reset') {
    e.target.innerText = 'Reset';
  
    interval = setInterval(adjustTimes, 1000);
  
    snakeBoard.focus();
  
    runGame();
    running = true;
  } else {
    location.reload();
  }
}

const adjustTimes = () => {
  seconds++;

  if (seconds === 60) {
    minutes++;
    seconds = 0;
    points += 3;
    console.log('extra points added for a minute');
  }

  if (minutes === 60) {
    hours++;
    minutes = 0;
    points += 13;
    console.log('extra points added for an hour');
  }

  timer.innerText = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
}

const runGame = () => {
  if (loser) {
    toggleModals(gameOverModal);
    finalScore.innerText = score;

    if (!hiScores[9] || score > Number(hiScores[9].score)) {
      const name = prompt(`
        Congrats, You\'ve scored in the top 10!!
        Please enter an identifier:
      `);
      insertScore(name ? name : 'anonymous');
    } else {
      insertScore('not_a_hi_scorer');
    }
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

const clearCanvas = () => {
  snakeBoardContext.fillStyle = '#000';
  snakeBoardContext.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
  snakeBoardContext.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
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

const checkForTailCollision = (head) => {
  snake.forEach(part => {
    if (head.x === part.x && head.y === part.y) {
      loser = true;
      clearInterval(interval);
    }
  });
}

const checkForPillCollision = head => {
  if ((xVelocity && head.x + 5 === pillXValue) && head.y + 5 === pillYValue || (yVelocity && head.y + 5 === pillYValue) && head.x + 5 === pillXValue) {

    pillColor === '#F00' ? pillColor = '#00F' : pillColor = '#F00';

    snake.unshift(head);

    score += points;
    points++;
    pillsEaten++;
    timeout = Number((timeout - .04).toFixed(2));

    const tableObject = {
      intervalRunsIn: `${timeout} ms`,
      nextPillIsWorth: points,
      score,
      pillsEaten,
    };
    console.table(tableObject);
    return true;
  }
}

// update velocities based on keypresses
// and make sure that you can't move backwards into your self
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

const insertScore = (name) => {
  const time = timer.innerText;
  const options = {
    method: 'POST',
    body: JSON.stringify({ score, name, time, pillsEaten }),
    'content-type': 'application/json',
  };
  makeNetworkRequest('/backend/insert_scores.php', options);
}

drawSnake();
populatePill();