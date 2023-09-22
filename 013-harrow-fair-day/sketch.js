let devider = 3;
let footageOne;
let footageTwo;
let detections = [];
let detectButton = document.getElementById('detect-btn');
let timeline = document.getElementById('timeline');

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
  // footageOne.loop();
});
// document.getElementById('play-btn').addEventListener('click',
//   function(){
//     document.getElementById('footage-two').play();
//   });
// document.getElementById('skip-btn').addEventListener('click', 
//   function(){
//     document.getElementById('footage-two').pause();
//     document.getElementById('footage-two').currentTime = 1000;
//     document.getElementById('footage-two').play();
//   }); 

let btnclicked = false;

function initialDetector() {
  objectDetector = ml5.objectDetector('cocossd', {}, modelLoaded);
}
function modelLoaded() {
  console.log('Model Loaded!');
  objectDetector.detect(footageOne, getDetections);
}
function getDetections(error, results) {
  if (error) {
    // location.reload();
    console.log(error);
  }

  detections = results;
  
  document.getElementById('skip-btn').addEventListener('click', function(){
    btnclicked = true;
  });
  if(btnclicked){
    // footageOne.pause();
    document.getElementById('footage-one').currentTime = round(random(0, 27));
    // footageOne.play();
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
