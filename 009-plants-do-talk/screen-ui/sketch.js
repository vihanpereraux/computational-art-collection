let socket;
const video = document.getElementById('reel');
let btn = document.getElementById('btn');
let videoPaused = true;
let objectDetector;
let canvasVideo;
let detections = [];

function setup() {
  let myCanvas =  createCanvas(360, 640);
  myCanvas.position((window.innerWidth - width)/2, (window.innerHeight - height)/2)
  socket = io.connect('http://localhost:3000/');

  let d = "Vihan";
  socket.emit('mouse', d);

  canvasVideo = createVideo('./videos/video_01.mp4');
  canvasVideo.loop();
  canvasVideo.volume(0);
  canvasVideo.hide();
  initialDetector();
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
  image(canvasVideo, 0, 0, width, height)

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
      currentObject.height/3)
  }

}
