let devider = 3;
let footageOne;
let footageTwo;
let glitches = [];
let detections = [];
let randomNumber;
let isAudioPlaying = false;
let isTimelineSkip = false;
let detectButton = document.getElementById('detect-btn');
let timeline = document.getElementById('timeline');

function preload(){
  for (let i = 0; i < 20; i++) {
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
  let customCanvas = createCanvas(1080/devider, 1920/devider);
  customCanvas.position(
    (window.innerWidth - width)/2, 
    (window.innerHeight - height)/2);

  footageOne = createVideo('./videos/clip07.mp4');
  footageOne.size(width, height); 
  footageOne.id('footage-one')
  footageOne.volume(0);
  // footageOne.showControls();
  // footageOne.hide();
}


detectButton.addEventListener('click', function(){
  initialDetector();
  footageOne.play();
  setTimeout(() => {
    isTimelineSkip = true;
  }, 3000);

  let glitchInterval = setInterval(() => {
    randomNumber = int(round(random(0, glitches.length - 1)));
    glitches[randomNumber].play();
    glitches[randomNumber].setVolume(.5);
  }, 2500);
}); 
function initialDetector() {
  objectDetector = ml5.objectDetector('cocossd', {}, modelLoaded);
}
function modelLoaded() {
  console.log('Model Loaded!');
  objectDetector.detect(footageOne, getDetections);
}
let btnclicked = false;
function getDetections(error, results) {
  if (error) {
    console.log(error);
  }

  detections = results;
  // document.getElementById('skip-btn').addEventListener('click', function(){
  //   btnclicked = true;
  // });
  if(btnclicked){
    document.getElementById('footage-one').currentTime = round(random(0, 27));
    btnclicked = false;
    setTimeout(() => {
      objectDetector.detect(footageOne, getDetections);    
    }, 100);
  }
  else{
    objectDetector.detect(footageOne, getDetections);
  }
}


function draw() {
  clear();
  console.log(isTimelineSkip);
  if(isTimelineSkip){
    if(glitches[randomNumber].isPlaying()){
      isAudioPlaying = true;
      btnclicked = true;
    }
    else{
      isAudioPlaying = false
    }
    console.log(isAudioPlaying);
  }
  
  // image(footageOne, 0, 0, width, height);
  // document.getElementById('footage-one').currentTime(int(document.getElementById('timeline').value));

  for (let i = 0; i < detections.length; i++) {
    console.log(detections[i].x, detections[i].y);
    let object = detections[i];

    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);    
    rect(
      (object.x / 540)*360, 
      (object.y / 540)*360, 
      (object.width / 960)*640, 
      (object.height / 960)*640)
  }
}
