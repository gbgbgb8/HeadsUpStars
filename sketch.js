let stars = [];
let speed = 0.1;
let wordContainer;
let words = ["apple", "banana", "cherry", "orange", "grape"];
let currentWordIndex = 0;
let currentWord;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }
  wordContainer = select('#wordContainer');
  currentWord = words[currentWordIndex];
  wordContainer.html(currentWord);
}

function draw() {
  background(0);
  stars.forEach(star => {
    star.update();
    star.show();
  });
  wordContainer.style('color', 'white');
  if (currentWordIndex >= words.length) {
    currentWordIndex = 0;
    currentWord = words[currentWordIndex];
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.z = random(width);
    this.pz = this.z;
  }

  update() {
    if (this.z > 0) {
      let tr = map(this.z, 0, width, 0.5, 0);
      this.x -= speed * (this.x - mouseX) * tr;
      this.y -= speed * (this.y - mouseY) * tr;
      this.z -= speed * 5;
      this.z = max(this.z, 0);
    } else {
      this.x = random(width);
      this.y = random(height);
      this.z = width;
      this.pz = this.z;
    }
  }

  show() {
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    let r = map(this.z, 0, width, 2, 0);
    noStroke();
    fill(255);
    ellipse(sx, sy, r, r);
  }
}