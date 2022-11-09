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
viewHiScoresButton.addEventListener('click', () => toggleModals(hiScoresModal));
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
pillXValue,
pillYValue,
interval,
hiScores;

// create and print a table to the console of all default settings onload
const initialTableObject = {
  intervalRunsIn: `${timeout} ms`,
  nextPillIsWorth: points,
  score,
  turn,
};

onload = () => console.table(initialTableObject);

const makeNetworkRequest = async (url, options = {}) => {
  const response = await fetch(url, options);
  const parsedResponse = await response.json();
  return parsedResponse;
}

// fn to pad hrs, mins, secs with zeros if there is less than 10 for a consistent look
const padTimes = (unit) => (unit < 10 ? '0' : '') + unit;

const adjustTimes = () => {
  seconds++

  if (seconds === 60) {
    minutes++;
    seconds = 0;
    points += 3;
    padTimes(seconds);
    console.log('extra points added for a minute');
  }

  if (minutes === 60) {
    hours++;
    minutes = 0;
    seconds = 0;
    points += 13;
    padTimes(minutes);
    padTimes(seconds);
    console.log('extra points added for an hour');
  }

  timer.innerText = `${padTimes(hours)}:${padTimes(minutes)}:${padTimes(seconds)}`;
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
  if (!keyClicked && !xVelocity && e.key.toLowerCase() === 'a') {
    keyClicked = true;
    xVelocity = -10;
    yVelocity = 0;
  } else if (!keyClicked && !xVelocity && e.key.toLowerCase() === 'd') {
    keyClicked = true;
    xVelocity = 10;
    yVelocity = 0;
  } else if (!keyClicked && !yVelocity && e.key.toLowerCase() === 'w') {
    keyClicked = true;
    xVelocity = 0;
    yVelocity = -10;
  } else if (!keyClicked && !yVelocity && e.key.toLowerCase() === 's') {
    keyClicked = true;
    xVelocity = 0;
    yVelocity = 10;
  }
}

const handleStartOrResetButtonClick = (e) => {

  // reset timing
  interval ? clearInterval(interval) : null;
  hours = 0;
  minutes = 0;
  seconds = 0;
  timer.innerHTML = `${padTimes(hours)}:${padTimes(minutes)}:${padTimes(seconds)}`;

  // reset player status and start with original, centered snake
  loser = false;
  timeout = 100;
  snake = getInitialSnake();
  score = 0;
  turn = 0;
  points = 100;
  keyClicked = false;

  if (e.target.innerText.toLowerCase() === 'start') {

    interval = setInterval(adjustTimes, 1000);
    
    // set game state to enable/disable recursively calling runGame fn
    reset = false;
    running = true;

    // focus on the canvas so the player can target the keypress event
    snakeBoard.focus();

    // hide instructions if they are currently displayed
    instructionsModal.classList.add('hidden');

    // disable instructions button during gameplay
    viewInstructionsButton.disabled = true;
    viewHiScoresButton.disabled = true;

    // update button text
    e.target.innerText = 'Reset';

    // run app
    runGame();
    running = true;
  } else {
    location.reload();
  }
  
  
  // else if (e.target.innerText.toLowerCase() === 'reset' && !running) {

  //   console.clear();

  //   // reset starting velocities so snake will proceed toward right of the screen
  //   xVelocity = 10;
  //   yVelocity = 0;
    
  //   // update state to stop recursively calling runGame fn
  //   running = false;
  //   reset = true;
  //   loser = true;

  //   // randomly put pill on canvas
  //   populatePill();
  //   drawSnake();

  //   // enable view instructions button
  //   viewInstructionsButton.disabled = false;
  //   viewHiScoresButton.disabled = false;

  //   // hide game over modal
  //   gameOverModal.classList.add('hidden');

  //   // update button text
  //   e.target.innerText = 'Start';

  //   // add snake to canvas without movement
  //   drawSnake();
  // } else if (e.target.innerText.toLowerCase() === 'reset' && running) {
    
  //   console.clear();

  //   // reset starting velocities so snake will proceed toward right of the screen
  //   xVelocity = 10;
  //   yVelocity = 0;

  //   // update state to stop recursively calling runGame fn
  //   running = false;
  //   reset = true;
  //   loser = true;

  //   // randomly put pill on canvas
  //   populatePill();

  //   // add snake to canvas without movement
  //   drawSnake();
  // }
}

// toggle instructions on/off on instructions button click
const toggleModals = (modal) => modal.classList.contains('hidden') ? modal.classList.remove('hidden') : modal.classList.add ('hidden');

// reset to blank canvas
const clearCanvas = () => {
  
  //  Select the color to fill the drawing
  snakeBoardContext.fillStyle = boardBackground;

  // Draw a 'filled' rectangle to cover the entire canvas
  snakeBoardContext.fillRect(0, 0, snakeBoard.width, snakeBoard.height);

  // Draw a 'border' around the entire canvas
  snakeBoardContext.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}

// Draw the snake on the canvas
const drawSnake = () => snake.forEach((snakePart, i) => drawSnakePart(snakePart, i));

// Draw one snake part
const drawSnakePart = (part, i) => {

  // Set the color of the snake part
  !i ? snakeBoardContext.fillStyle = '#FF0' : snakeBoardContext.fillStyle = snakeColor;

  // Draw a 'filled' rectangle to represent the snake part at the coordinates the part is located
  snakeBoardContext.fillRect(part.x, part.y, 10, 10);

  // Draw a border around the snake part
  snakeBoardContext.strokeRect(part.x, part.y, 10, 10);
}

const moveSnake = () => {  

  // condition to check if a collision occurs with one of the walls
  if (snake[0].x + xVelocity === -10 || snake[0].x + xVelocity === 600 || snake[0].y + yVelocity === -10 || snake[0].y + yVelocity === 350) {
    loser = true;
    running = false;
    clearInterval(interval);
    return;
  }

  // variable describing where the snake will be next
  const head = {
    x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity,
  };

    checkForTailCollision(head);

    // if the snake collides with a pill, randomly generate another one
    if (checkForPillCollision(head)) {
      populatePill();
    } else {
      
      // add new head position and remove end of tail
      snake.unshift(head);
      snake.pop();
    }
}

// runGame function called repeatedly to keep the game running
const runGame = (e) => {
  if (loser) {

    // show game over modal
    gameOverModal.classList.remove('hidden');
    
    // display user score on game over modal
    finalScore.innerText = score;

    if (!hiScores[9] || score > Number(hiScores[9].score)) {
      const name = prompt(`
        Congrats, You\'ve scored in the top 10!!
        Please enter an identifier:
      `);
      const time = timer.innerText;
      insertHiScore(score, name ? name : 'anonymous', time);
    }
    
    viewInstructionsButton.disabled = false;
    viewHiScoresButton.disabled = false;
    
    // clear current board
    snakeBoardContext.clearRect(0, 0, snakeBoard.width, snakeBoard.height);

  } else {
    
    // repaint canvas with each call to runGame
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

  // declare variable to make sure the pill isn't populated on top of the snake
  let pillIsOnOrAroundSnake = false;

  // if called without all arguments, generate random x and y values for pills
  if (!x || !y) {

    // get random 10x10 blocks on the canvas for pill placement
    // add five to center the pill in the square on the grid
    possibleX = Math.random() * 60 + 5
    possibleY = Math.random() * 35 + 5
    
    // make sure the random coordinates are not too close or on top of the snake
    snake.forEach(snakePart => {
      if (possibleX * 10 - snakePart.x <= 5 && possibleX * 10 - snakePart.x >= -5 && possibleY * 10 - snakePart.y <= 5 && possibleY * 10 - snakePart.y >= -5) {
        pillIsOnOrAroundSnake = true;
      }
    });

    // make sure random coordinates are not off the border
    if (possibleX * 10 < 5 || possibleX * 10 > 595 || possibleY * 10 < 5 || possibleY * 10 > 345 || pillIsOnOrAroundSnake) {
      populatePill();
      return;
    }

    // round off decimals and scale values to actual columns and rows
    pillXValue = Math.round(possibleX) * 10 + 5;
    pillYValue = Math.round(possibleY) * 10 + 5;
  }

  // draw and color pills on the page
  snakeBoardContext.beginPath();
  snakeBoardContext.ellipse(pillXValue, pillYValue, 5 , 5, Math.PI / 4, 0, 2 * Math.PI);
  snakeBoardContext.stroke();
  snakeBoardContext.fillStyle = pillColor;
  snakeBoardContext.fill();
  snakeBoardContext.closePath();

  if (!hiScores) {
    hiScores = await makeNetworkRequest('/backend/get_scores.php');
    populateHiScores();
  }
}

const populateHiScores = () => {
  for (let i = 0; i < 10; i++) {
    const hiScore = hiScores[i] ?? { name: 'EMPTY', score: '0', time: '00:00:00' };
    const hiScoreRow = document.querySelector(`.table-data-${i}`);
    hiScoreRow.innerHTML += `${i + 1}. ${hiScore.name} - ${hiScore.score} - ${hiScore.time}`;
  }
}

const checkForPillCollision = (head) => {
  if ((xVelocity && head.x + 5 === pillXValue) && head.y + 5 === pillYValue || (yVelocity && head.y + 5 === pillYValue) && head.x + 5 === pillXValue) {

    // rotate pill colors between blue and red
    pillColor === '#F00' ? pillColor = '#00F' : pillColor = '#F00';

    // add head without removing end of tail to grow snake
    snake.unshift(head);

    score += points;
    points++;
    turn++;

    // gradually speed up movement of the snake
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
  snake.forEach(snakePart => {
    if (head.x === snakePart.x && head.y === snakePart.y) {
      loser = true;
      clearInterval(interval);
    }
  });
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