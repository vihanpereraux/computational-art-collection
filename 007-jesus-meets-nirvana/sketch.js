let video;
let detector;
let detections = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, videoReady);
  video.size(640, 480);
  video.hide();
}

function videoReady() {
  detector = ml5.objectDetector('cocossd', modelReady);
}

function modelReady() {
  detector.detect(video, gotDetections);
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

  detector.detect(video, gotDetections);
}

function draw() {
  image(video, 0, 0);
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