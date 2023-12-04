const wndWidth = window.innerWidth;
const wndHeight = window.innerHeight;
const ratioDevider = 3;
let glitches = [];
let points = [];
let controller;


function preload(){
  for (let i = 0; i < 10; i++) {
    if(i < 9){
      let glitch = loadSound('./audio/effect0' + String(i + 1) + '.mp3'); 
      glitches.push(glitch);
    }
    else{
      let glitch = loadSound('./audio/effect' + String(1 + i) + '.mp3'); 
      glitches.push(glitch);
    }
  }
}

function setup() {
  const newCanvas =
    createCanvas(1080 / ratioDevider, 1920 / ratioDevider);
  newCanvas.position((wndWidth - width) / 2, (wndHeight - height) / 2);
  angleMode(DEGREES);

  controller = random(.001, .002);
  let d = 200;
  let padding = width / d;
  for (let i = 0; i < width; i += padding) {
    for (let j = 0; j < height; j += padding) {
      let value = 10;
      let point =
        createVector(i * random(value, -value), j * random(value, -value));
      points.push(point);
    }
  }
}

function draw() {
  clear();
  // background(0)

  setGrid();

  noStroke();
  fill(255);
  for (let i = 0; i < points.length; i++) {
    let angle = map(noise(points[i].x * controller, points[i].y * controller), 0, 1, 0, 720);
    points[i].add(createVector(cos(angle), sin(angle)))
    circle(points[i].x, points[i].y, 2);
  }

  stroke(255);
  strokeWeight(1);
  let startValue = round(random(points.length - 1));
  let endValue = round(random(points.length - 1));
  line(points[startValue].x, points[startValue].y, points[endValue].x, points[endValue].y)
}

setInterval(() => {
  // let randomNumber = int(round(random(0, glitches.length - 1)));
  // glitches[randomNumber].play();
  location.reload();
}, 10000);

function setGrid() {
  strokeWeight(.5);
  stroke(255);
  line(0, 0, 0, height);
  line(width * .25, 0, width * .25, height);
  line(width * .5, 0, width * .5, height);
  line(width * .75, 0, width * .75, height);
  line(width, 0, width, height);

  line(0, 0, width, 0);
  line(0, height * .5, width, height * .5);
  line(0, height * .25, width, height * .25);
  line(0, height * .75, width, height * .75);
  line(0, height, width, height);
}