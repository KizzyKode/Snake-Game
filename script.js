window.onload = function() {
  let score = 0;
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
// Snake size and starting position
const snakeSize = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let snakeArray = [{ x, y }];

// Movement direction
let dx = 0;
let dy = 0;

// Food position
let foodX;
let foodY;


// Draw snake on canvas

function drawSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw head
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(x + snakeSize/2, y + snakeSize/2, snakeSize/2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  
  // Draw eyes
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(x + snakeSize/3, y + snakeSize/3, snakeSize/5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x + snakeSize - snakeSize/3, y + snakeSize/3, snakeSize/5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  // Draw pupils
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.arc(x + snakeSize/3, y + snakeSize/3, snakeSize/10, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x + snakeSize - snakeSize/3, y + snakeSize/3, snakeSize/10, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  // Draw body
  for (let i = 1; i < snakeArray.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.rect(snakeArray[i].x, snakeArray[i].y, snakeSize, snakeSize);
    ctx.fill();
    ctx.closePath();
  }
  


    // Draw food on canvas
    drawFood();

    // Move snake
    x += dx;
    y += dy;

    // Check for collision with walls
if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
  clearInterval(gameInterval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", canvas.width/2 - 90, canvas.height/2);
  const restartBtn = document.createElement("button");
  restartBtn.innerHTML = "Restart";
  restartBtn.classList.add("restart-btn");
  restartBtn.addEventListener("click", function() {
  location.reload();
  });
  document.body.appendChild(restartBtn);
  }

  // Update the score on the page

 

function updateScore(score) {
  const scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.innerHTML = "Score: " + score;
}


// Check for collision with food
if (x === foodX && y === foodY) {
  snakeArray.push({ x, y });
  generateFood();
  score++;
  updateScore(score);
}

// Call updateScore when the game starts
updateScore(score);

    // Update snakeArray
    for (let i = snakeArray.length - 1; i > 0; i--) {
        snakeArray[i].x = snakeArray[i - 1].x;
        snakeArray[i].y = snakeArray[i - 1].y;
    }
    snakeArray[0].x = x;
    snakeArray[0].y = y;
}


// Draw food on canvas
function drawFood() {
  ctx.beginPath();
  ctx.rect(foodX, foodY, snakeSize, snakeSize);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// Generate random food location
function generateFood() {
    foodX =
        Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
    foodY =
        Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
}

// Handle arrow key events for movement
document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 37: // left arrow
            dx = -snakeSize;
            dy = 0;
            break;
        case 38: // up arrow
            dx = 0;
            dy = -snakeSize;
            break;
        case 39: // right arrow
            dx = snakeSize;
          dy = 0;
          break;
        case 40: // down arrow
          dx = 0;
          dy = snakeSize;
          break;
      }
    };

    generateFood();
    const gameInterval = setInterval(drawSnake, 100);
  };
