let socket;
const video = document.getElementById('reel');
let btn = document.getElementById('btn');
let videoPaused = true;
let objectDetector;
let canvasVideo;
let detections = [];

let xAxisRange;
let widthRange;
let opacityRange;

function setup() {
  frameRate(60);
  angleMode(DEGREES);

  let myCanvas =  createCanvas(360, 640);
  myCanvas.position((window.innerWidth - width)/2, (window.innerHeight - height)/2)
  
  socket = io.connect('http://172.20.10.3:3000/');
  socket.on('mouse', function(data){
    console.log(data)
  })

  xAxisRange = document.getElementById("x-axis-range");
  widthRange = document.getElementById("width-range");
  opacityRange = document.getElementById("opacity-range");

  canvasVideo = createVideo('./videos/overview.mp4');
  canvasVideo.id('oaka')
  canvasVideo.loop();
  canvasVideo.volume(0);
  canvasVideo.hide();
}


btn.addEventListener('click', function(){
  if(videoPaused){
    videoPaused = false;
    canvasVideo.play();
    initialDetector();
    btn.innerText = "Pause";
  }
  else{
    videoPaused = true;
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
  let opacityRangeValue = opacityRange.value;

  image(
    canvasVideo, 
    random(-xAxisRangeValue, xAxisRangeValue), 
    0, 
    width * random(1, widthRangeValue), 
    height);
  // image(canvasVideo, random(-10, 10), 0, width*random(0,1.5), height);
  // image(canvasVideo, 0, 0, width, height);

  // tint
  tint(255, int(opacityRangeValue));

  for (let i = 0; i < detections.length; i++) {
    let currentObject = detections[i];

    // bounds
    noFill();
    stroke(255);
    strokeWeight(1.5);
    rect(
      currentObject.x/3, 
      currentObject.y/3, 
      currentObject.width/3, 
      currentObject.height/3);

    // labels
    strokeWeight(1);
    text(
      round(currentObject.confidence, 3),
      currentObject.x/3 + (currentObject.width/3)/2,
      (currentObject.y/3. + (currentObject.height/3)/2) - 30);
    
    // lines
    stroke(255);
    strokeWeight(.8);
    let randomValue = round(random(0, cordpool.length - 1));
    line(
      cordpool[randomValue].x, 
      cordpool[randomValue].y, 
      currentObject.x/3 + (currentObject.width/3)/2, 
      currentObject.y/3 + (currentObject.height/3)/2);
  }

}
