let stars = [];
let baseSpeed = 0.1;
let maxSpeed = 5;
let currentSpeed = baseSpeed;
let wordContainer;
let words = [];
let currentWordIndex = 0;
let currentWord;
let wordChangeTimer;
let timerDuration = 60000; // 60 seconds
let timerStartTime;

function preload() {
  loadJSON('words.json', function(data) {
    words = data.words;
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 800; i++) {
    stars.push(new Star());
  }
  wordContainer = select('#wordContainer');
  changeWord();
  timerStartTime = millis();
  wordChangeTimer = setInterval(changeWord, timerDuration);
}

function draw() {
  background(0);
  updateSpeed();
  stars.forEach(star => {
    star.update();
    star.show();
  });
}

function updateSpeed() {
  let timeElapsed = millis() - timerStartTime;
  currentSpeed = map(timeElapsed, 0, timerDuration, baseSpeed, maxSpeed);
  currentSpeed = min(currentSpeed, maxSpeed);
}

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;
  }

  update() {
    this.z -= currentSpeed;
    if (this.z < 1) {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = width;
      this.pz = this.z;
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

function changeWord() {
  if (words.length > 0) {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    currentWord = words[currentWordIndex];
    wordContainer.html(currentWord);
    timerStartTime = millis(); // Reset the timer
    resetSpeed();
  }
}

function resetSpeed() {
  currentSpeed = baseSpeed;
}

function mouseClicked() {
  changeWord();
  clearInterval(wordChangeTimer);
  wordChangeTimer = setInterval(changeWord, timerDuration);
}

function keyPressed() {
  if (key === ' ') {
    changeWord();
    clearInterval(wordChangeTimer);
    wordChangeTimer = setInterval(changeWord, timerDuration);
  }
}
