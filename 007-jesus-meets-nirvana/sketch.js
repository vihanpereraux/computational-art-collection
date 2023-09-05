let video;
let video2;
let detector;
let detections = [];
let playButton = document.getElementById('play-button');
let isVideoPlaying = false;

function setup() {
  createCanvas(640, 440);
  video2 = createVideo('./samples/sample.mp4', videoReady);
  video2.size(640, 480);
  video2.pause();
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
  // console.log(
  //   results[0].width, 
  //   results[0].height,
  //   results[0].x,
  //   results[0].y);

  detector.detect(video2, gotDetections);
}

function draw() {
  image(video2, 0, 0, 640, 480);
  // console.log(detections);
  for (let i = 0; i < detections.length; i += 1) {
    const object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}