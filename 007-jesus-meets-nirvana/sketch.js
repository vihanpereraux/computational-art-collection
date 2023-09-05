let video;
let video2;
let detector;
let detections = [];
let playButton = document.getElementById('play-button');
let isVideoPlaying = false;

function setup() {
  createCanvas(854, 480);
  video2 = createVideo('./samples/sample.mp4', videoReady);
  video2.size(width, height);
  video2.loop();
  video2.volume(0);
}

playButton.addEventListener('click', function(){
  if(!isVideoPlaying){
    isVideoPlaying = true;
    playButton.innerText = "Pause";
    video2.play();
    video2.loop();
  }
  else{
    isVideoPlaying = false;
    playButton.innerText = "Play";
    video2.pause();
  }
});


function videoReady() {
  detector = ml5.objectDetector('cocossd', modelReady);
}

function modelReady() {
  detector.detect(video2, gotDetections);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video2, gotDetections);
}

function draw() {
  image(video2, 0, 0, width, height);
  for (let i = 0; i < detections.length; i += 1) {
    const object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(
      object.x, 
      object.y, 
      object.width, 
      object.height);

    // labels
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}