const gameBoard = document.getElementById("gameBoard");
const resetButton = document.getElementById("resetButton");
const scoreText = document.getElementById("scoreText");
const ctx = gameBoard.getContext("2d");
const gameHeight = gameBoard.height;
const gameWidth = gameBoard.width;
const boardColor = "lightgreen";
const snakeColor = "lightblue";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let score = 0;
let running = false;
let XVelocity = unitSize;
let YVelocity = 0;
let foodX;
let foodY;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize * 1, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);
resetButton.onclick = resetGame();

gameStart();
function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}
function clearBoard() {
  ctx.fillstyle = boardColor;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 100);
  } else {
    displayGameOver();
  }
}
function createFood() {
  // Coming up with random area to place food
  function randomFood(min, max) {
    let randNum = Math.floor(
      Math.random() * ((max - min + min) / unitSize) * unitSize
    );
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameHeight - unitSize);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
  const snakeHead = {
    x: snake[0].x + XVelocity,
    y: snake[0].y + YVelocity,
  };
  snake.unshift(snakeHead);
  //If food is eaten
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
  } else {
    snake.pop();
  }
}
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const UP = 40;
  const DOWN = 38;
  const RIGHT = 39;
  const LEFT = 37;

  const goingUp = YVelocity == -unitSize;
  const goingDown = YVelocity == unitSize;
  const goingLeft = XVelocity == -unitSize;
  const goingRight = XVelocity == unitSize;

  switch (true) {
    case keyPressed == DOWN && !goingUp:
      XVelocity = 0;
      YVelocity = unitSize;
      break;
    case g(keyPressed == UP && !goingDown):
      XVelocity = 0;
      YVelocity = -unitSize;
      break;
    case keyPressed == LEFT && !goingRight:
      XVelocity = -unitSize;
      YVelocity = 0;
      break;
    case keyPressed == RIGHT && !goingLeft:
      XVelocity = unitSize;
      YVelocity = 0;
      break;
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function displayGameOver() {
  ctx.font = "50px Comic Sans MS";
  ctx.fillStyle = "black";
  ctz.textAlign = "center";
  ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
  running = false;
}
function resetGame() {
  score = 0;
  XVelocity = unitSize;
  YVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize * 1, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}
