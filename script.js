let stars = [];
let speed;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('starfield');
    for (let i = 0; i < 800; i++) {
        stars[i] = new Star();
    }
    speed = 1;
}

function draw() {
    speed = map(mouseX, 0, width, 0, 50);
    background(0);
    translate(width / 2, height / 2);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
}

function Star() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);

    this.update = function() {
        this.z = this.z - speed;
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
        }
    };

    this.show = function() {
        fill(255);
        noStroke();

        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);

        let r = map(this.z, 0, width, 16, 0);
        ellipse(sx, sy, r, r);
    };
}
let words = ["Planet", "Star", "Galaxy", "Comet", "Asteroid"];
let currentWordIndex = 0;
let displayTime = 5000; // 5 seconds per word

function showNextWord() {
    let word = words[currentWordIndex];
    document.getElementById('word-display').innerText = word;
    currentWordIndex = (currentWordIndex + 1) % words.length;
    setTimeout(showNextWord, displayTime);
}

window.onload = function() {
    showNextWord();
};
