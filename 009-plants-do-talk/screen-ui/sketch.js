let socket;
const video = document.getElementById('reel');
let btn = document.getElementById('btn');
let videoPaused = true;
let objectDetector;
let canvasVideo;
let detections = [];
let values;
let cordpool;

let xAxisRange;
let widthRange;
let opacityRange;

function setup() {
  frameRate(60);
  angleMode(DEGREES);

  let myCanvas = createCanvas(360, 640);
  myCanvas.position((window.innerWidth - width) / 2, (window.innerHeight - height) / 2)

  socket = io.connect('http://172.20.10.3:3000/');

  values = {
    playBackRateValue: 0,
    xAxisRangeValue: 0,
    widthRangeValue: 1,
    opacityRangeValue: 255,
  }
  socket.on('mouse', function (data) {
    values.playBackRateValue = data.playBackRateValue;
    values.xAxisRangeValue = data.xAxisRangeValue;
    values.widthRangeValue = data.widthRangeValue;
    values.opacityRangeValue = data.opacityRangeValue;

    console.log(values);
  })

  xAxisRange = document.getElementById("x-axis-range");
  widthRange = document.getElementById("width-range");
  opacityRange = document.getElementById("opacity-range");

  canvasVideo = createVideo('./videos/video3.mp4');
  canvasVideo.id('oaka')
  canvasVideo.loop();
  canvasVideo.volume(0);
  // canvasVideo.hide();
}


btn.addEventListener('click', function () {
  if (videoPaused) {
    videoPaused = false;
    canvasVideo.play();
    initialDetector();
    btn.innerText = "Pause";
  }
  else {
    videoPaused = true;
    canvasVideo.pause();
    btn.innerText = "Play";
  }
});
function initialDetector() {
  objectDetector = ml5.objectDetector('cocossd', {}, modelLoaded);
}
function modelLoaded() {
  console.log('Model Loaded!');
  objectDetector.detect(canvasVideo, getDetections);
}
function getDetections(error, results) {
  if (error) {
    location.reload();
    console.log(error);
  }
  detections = results;
  objectDetector.detect(canvasVideo, getDetections);
}


function draw() {
  cordpool = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: 0, y: height },
    { x: width, y: height },
  ];

  let xAxisRangeValue = values.xAxisRangeValue;
  let widthRangeValue = values.widthRangeValue;
  let opacityRangeValue = opacityRange.value;

  // data.playBackRateValue;
  // data.xAxisRangeValue;
  // data.widthRangeValue;
  // data.opacityRangeValue;

  // effect 01
  effectOne();

  // effect 02 - mirror
  // effectTwo();
}

function effectOne() {
  
  tint(255, int(opacityRange.value));
  rotate(10, [0])
  image(
    canvasVideo,
    random(-values.xAxisRangeValue, values.xAxisRangeValue),
    0,
    width * random(1, widthRange.value),
    height);

  for (let i = 0; i < detections.length; i++) {
    let currentObject = detections[i];

    // bounds
    noFill();
    stroke(255);
    strokeWeight(1.5);
    rect(
      currentObject.x / 3,
      currentObject.y / 3,
      currentObject.width / 3,
      currentObject.height / 3);

    // labels
    strokeWeight(1);
    text(
      round(currentObject.confidence, 3),
      currentObject.x / 3 + (currentObject.width / 3) / 2,
      (currentObject.y / 3. + (currentObject.height / 3) / 2) - 30);

    // lines
    stroke(255);
    strokeWeight(.8);
    let randomValue = round(random(0, cordpool.length - 1));
    line(
      cordpool[randomValue].x,
      cordpool[randomValue].y,
      currentObject.x / 3 + (currentObject.width / 3) / 2,
      currentObject.y / 3 + (currentObject.height / 3) / 2);
  }
}

function effectTwo() {
  tint(255, 40);
  image(
    canvasVideo,
    0, 0,
    width,
    height);

  for (let i = 0; i < detections.length; i++) {
    let currentObject = detections[i];

    // bounds
    noFill();
    stroke(255);
    strokeWeight(1.5);
    rect(
      currentObject.x / 3,
      currentObject.y / 3,
      currentObject.width / 3,
      currentObject.height / 3);

    // labels
    strokeWeight(1);
    text(
      round(currentObject.confidence, 3),
      currentObject.x / 3 + (currentObject.width / 3) / 2,
      (currentObject.y / 3. + (currentObject.height / 3) / 2) - 30);

    // lines
    stroke(255);
    strokeWeight(.8);
    let randomValue = round(random(0, cordpool.length - 1));
    line(
      cordpool[randomValue].x,
      cordpool[randomValue].y,
      currentObject.x / 3 + (currentObject.width / 3) / 2,
      currentObject.y / 3 + (currentObject.height / 3) / 2);
  }

  tint(255, 255);
  image(
    canvasVideo,
    width/2, 0,
    width,
    height);
}
