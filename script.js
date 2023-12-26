let stars = [];
let baseSpeed = 0.1;
let maxSpeed = 5;
let currentSpeed = baseSpeed;
let wordContainer;
let allWords = {};
let words = [];
let currentWordIndex = 0;
let currentWord;
let wordChangeTimer;
let timerDuration = 60000;
let timerStartTime;
let score = 0;

function preload() {
  loadJSON('words.json', function(data) {
    allWords = data.words;
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  wordContainer = select('#wordContainer');

  select('#easy').mousePressed(() => startGame('easy'));
  select('#medium').mousePressed(() => startGame('medium'));
  select('#difficult').mousePressed(() => startGame('difficult'));
  select('#hard').mousePressed(() => startGame('hard'));
  select('#actions').mousePressed(() => startGame('actions'));

  select('#thumbsUp').mousePressed(increaseScore);
  select('#thumbsDown').mousePressed(decreaseScore);
  select('#quitButton').mousePressed(quitGame);

  for (let i = 0; i < 800; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);
  updateSpeed();
  stars.forEach(star => {
    star.update();
    star.show();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function updateSpeed() {
  let timeElapsed = millis() - timerStartTime;
  currentSpeed = map(timeElapsed, 0, timerDuration, baseSpeed, maxSpeed, true);
  currentSpeed = min(currentSpeed, maxSpeed);
}

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
  }

  update() {
    this.z -= currentSpeed;
    if (this.z < 1) {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = width;
    }
  }

  show() {
    fill(255);
    noStroke();
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    let r = map(this.z, 0, width, 16, 0);
    ellipse(sx, sy, r, r);
  }
}

function startGame(difficulty) {
  words = allWords[difficulty];
  select('#startScreen').style('display', 'none');
  select('#game').style('display', 'block');
  changeWord();
  timerStartTime = millis();
  wordChangeTimer = setInterval(changeWord, timerDuration);
}

function changeWord() {
  currentWordIndex = (currentWordIndex + 1) % words.length;
  currentWord = words[currentWordIndex];
  wordContainer.html(currentWord);
  timerStartTime = millis();
  resetSpeed();
  stars = [];
  for (let i = 0; i < 800; i++) {
    stars.push(new Star());
  }
}

function resetSpeed() {
  currentSpeed = baseSpeed;
}

function increaseScore() {
  score++;
  console.log("Score: " + score); // Update to display on screen if needed
}

function decreaseScore() {
  score--;
  console.log("Score: " + score); // Update to display on screen if needed
}

function quitGame() {
  select('#game').style('display', 'none');
  select('#startScreen').style('display', 'flex');
  resetGame();
}

function resetGame() {
  score = 0;
  // Reset other game states as needed
}

function touchStarted() {
  changeWord();
  return false;
}

function keyPressed() {
  if (key === ' ') {
    changeWord();
  }
}
