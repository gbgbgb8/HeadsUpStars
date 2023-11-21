let stars = [];
let speed;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('starfield');
    speed = 1;
    console.log("Canvas initialized with size:", windowWidth, windowHeight);
}

function draw() {
    console.log("Draw function executing");
    background(0); // Change back to black background

    // Temporary: draw a fixed circle to test rendering
    fill(255, 0, 0);
    ellipse(width / 2, height / 2, 50, 50);

    // Comment out the stars for now
    /*
    speed = map(mouseX, 0, width, 0, 50);
    translate(width / 2, height / 2);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
    */
}

// Comment out the Star class for now
/*
function Star() {
    // Star class definition
}
*/

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
