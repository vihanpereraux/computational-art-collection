let socket;
const video = document.getElementById('reel');
let btn = document.getElementById('btn');
let videoPaused = true;
let objectDetector;
let canvasVideo;
let detections = [];

let xAxisRange;
let widthRange;

function setup() {
  frameRate(60);
  angleMode(DEGREES);

  let myCanvas =  createCanvas(360, 640);
  myCanvas.position((window.innerWidth - width)/2, (window.innerHeight - height)/2)
  socket = io.connect('http://localhost:3000/');

  let d = "Vihan";
  socket.emit('mouse', d);

  xAxisRange = document.getElementById("x-axis-range");
  widthRange = document.getElementById("width-range");

  canvasVideo = createVideo('./videos/overview.mp4');
  canvasVideo.id('oaka')
  canvasVideo.loop();
  canvasVideo.volume(0);
  canvasVideo.hide();
  // initialDetector();
}


btn.addEventListener('click', function(){
  if(videoPaused){
    videoPaused = false;
    // play
    canvasVideo.play();
    initialDetector();
    btn.innerText = "Pause";
  }
  else{
    videoPaused = true;
    // pause the video
    canvasVideo.pause();
    btn.innerText = "Play";
  }
});
function initialDetector(){
  objectDetector = ml5.objectDetector('cocossd', {}, modelLoaded);
}
function modelLoaded() {
  console.log('Model Loaded!');
  objectDetector.detect(canvasVideo, getDetections);
}
function getDetections(error, results){
  if(error){
    location.reload();
    console.log(error);
  }
  detections = results;
  objectDetector.detect(canvasVideo, getDetections);
}


function draw() {
  let cordpool = [
    {x: 0, y: 0},
    {x: width, y: 0},
    {x: 0, y: height},
    {x: width, y: height},
  ];

  let xAxisRangeValue = xAxisRange.value;
  let widthRangeValue = widthRange.value;

  image(
    canvasVideo, 
    random(-xAxisRangeValue, xAxisRangeValue), 
    0, 
    width * random(1, widthRangeValue), 
    height);

  // image(canvasVideo, random(-10, 10), 0, width*random(0,1.5), height);

  // image(canvasVideo, 0, 0, width, height);

  for (let i = 0; i < detections.length; i++) {
    let currentObject = detections[i];

    // bounds
    noFill();
    stroke(255);
    strokeWeight(1);
    rect(
      currentObject.x/3 + 30, 
      currentObject.y/3 + 30, 
      currentObject.width/3 - 30, 
      currentObject.height/3 - 30);

    strokeWeight(1);
    text(
      round(currentObject.confidence, 3),
      currentObject.x/3 + (currentObject.width/3)/2,
      (currentObject.y/3. + (currentObject.height/3)/2) - 30);
    
    stroke(255);
    strokeWeight(1);
    let randomValue = round(random(0, cordpool.length - 1));
    line(
      cordpool[randomValue].x, 
      cordpool[randomValue].y, 
      currentObject.x/3 + (currentObject.width/3)/2, 
      currentObject.y/3 + (currentObject.height/3)/2);
  }

}
