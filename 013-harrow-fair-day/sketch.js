let devider = 3;
let footages = [];
let currentFootage;
let footageOne;
let footageTwo;
let footageThree;
let footageFour;
let glitches = [];
let detections = [];
let randomNumber;
let isAudioPlaying = false;
let isTimelineSkip = false;
let detectButton = document.getElementById('detect-btn');
let timeline = document.getElementById('timeline');
let changerButton = document.getElementById('changer-btn');

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
  
  localStorage.setItem('currentlyPlaying', 'footage-one');

  footageOne = createVideo('./videos/clip07.mp4');
  footageOne.size(width, height); 
  footageOne.id('footage-one')
  footageOne.volume(0);

  footageTwo = createVideo('./videos/clip01.mp4');
  footageTwo.size(width, height); 
  footageTwo.id('footage-two')
  footageTwo.volume(0);
  footageTwo.hide();

  footageThree = createVideo('./videos/clip03.mp4');
  footageThree.size(width, height); 
  footageThree.id('footage-three')
  footageThree.volume(0);
  footageThree.hide();

  footageFour = createVideo('./videos/clip02.mp4');
  footageFour.size(width, height); 
  footageFour.id('footage-four')
  footageFour.volume(0);
  footageFour.hide();

  footages = [footageOne, footageTwo, footageThree, footageFour]
}


changerButton.addEventListener('click', function(){
  currentFootage = random(footages);
  console.log(currentFootage.elt.id);

  switch (String(currentFootage.elt.id)) {
    case 'footage-one':
      footageTwo.hide();
      footageThree.hide();
      footageFour.hide();
      localStorage.setItem('currentlyPlaying', 'footage-one');
      document.getElementById('footage-one').style.display = 'block';
      currentFootage = footages[0];
      break;
  
    case 'footage-two':
      footageOne.hide();
      footageThree.hide();
      footageFour.hide();
      localStorage.setItem('currentlyPlaying', 'footage-two');
      document.getElementById('footage-two').style.display = 'block';
      footageTwo.play();
      currentFootage = footages[1];
      break;

    case 'footage-three':
      footageOne.hide();
      footageTwo.hide();
      footageFour.hide();
      localStorage.setItem('currentlyPlaying', 'footage-three');
      footageThree.play();
      document.getElementById('footage-three').style.display = 'block';
      currentFootage = footages[2];
      break;

    case 'footage-four':
      footageOne.hide();
      footageTwo.hide();
      footageThree.hide();
      localStorage.setItem('currentlyPlaying', 'footage-four');
      footageFour.play();
      document.getElementById('footage-four').style.display = 'block';
      currentFootage = footages[3];
      break;
  
    default:
      break;
  }
  
})
detectButton.addEventListener('click', function(){
  initialDetector();
  footageOne.play();
  
  setTimeout(() => {
    isTimelineSkip = true;
  }, 3000);

  let glitchInterval = setInterval(() => {
    randomNumber = int(round(random(0, glitches.length - 1)));
    glitches[randomNumber].play();
    glitches[randomNumber].setVolume(1);
  }, 2500);
}); 
function initialDetector() {
  objectDetector = ml5.objectDetector('cocossd', {}, modelLoaded);
}
function modelLoaded() {
  console.log('Model Loaded!');
  currentFootage = footages[0];
  objectDetector.detect(currentFootage, getDetections);
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
    switch (localStorage.getItem('currentlyPlaying')) {
      case 'footage-one':
        document.getElementById('footage-one').currentTime = 
          round(random(0, int(document.getElementById('footage-one').duration)));    
        break;

      case 'footage-two':
        document.getElementById('footage-two').currentTime = 
          round(random(0, int(document.getElementById('footage-two').duration)));    
        break;

      case 'footage-three':
        document.getElementById('footage-three').currentTime = 
          round(random(0, int(document.getElementById('footage-three').duration)));    
        break;

      case 'footage-four':
        document.getElementById('footage-four').currentTime = 
          round(random(0, int(document.getElementById('footage-four').duration)));    
        break;
    
      default:
        break;
    }
    // document.getElementById('footage-one').currentTime = 
    //   round(random(0, int(document.getElementById('footage-one').duration)));
    btnclicked = false;
    setTimeout(() => {
      objectDetector.detect(currentFootage, getDetections);    
    }, 100);
  }
  else{
    objectDetector.detect(currentFootage, getDetections);
  }
}


function draw() {
  // set scroll postion to the bottom of the div
  document.getElementById('stat').
    scrollTo(0, document.getElementById('stat').scrollHeight);
  document.getElementById('audio-stat').
    scrollTo(0, document.getElementById('stat').scrollHeight);

  clear();

  // audio stat
  document.getElementById('name').innerText = 
    localStorage.getItem('currentlyPlaying');
  
  console.log(isTimelineSkip);
  if(isTimelineSkip){
    if(glitches[randomNumber].isPlaying()){
      isAudioPlaying = true;
      btnclicked = true;

      switch (localStorage.getItem('currentlyPlaying')) {
        case 'footage-one':
          document.getElementById('footage-one').style.filter = 'grayscale(0)';
          break;

        case 'footage-two':
            document.getElementById('footage-two').style.filter = 'grayscale(0)';
            break;

        case 'footage-three':
          document.getElementById('footage-three').style.filter = 'grayscale(0)';
          break;

        case 'footage-four':
          document.getElementById('footage-four').style.filter = 'grayscale(0)';
          break;
      
        default:
          break;
      }

      // audio stat
      let glitchData = document.createElement('p');
      glitchData.innerText = 
        String(glitches[randomNumber].file) 
        + " , " +
        String(glitches[randomNumber].buffer.duration); 
      document.getElementById('audio-stat').appendChild(glitchData);
    }
    else{
      document.getElementById('footage-one').style.filter = 'grayscale(0)';
      document.getElementById('footage-two').style.filter = 'grayscale(0)';
      document.getElementById('footage-three').style.filter = 'grayscale(0)';
      document.getElementById('footage-four').style.filter = 'grayscale(0)';
      isAudioPlaying = false
    }
    console.log(isAudioPlaying);
  }
  
  // tint(255, 70);
  // image(footageOne, 0, 0, width, height);
  // document.getElementById('footage-one').currentTime(int(document.getElementById('timeline').value));

  let detectionLength = detections.length;

  // illustrations
  for (let i = 0; i < detections.length; i++) {
    console.log(detections[i].label ,detections[i].x, detections[i].y);
    let object = detections[i];

    // detection stat
    let paka = document.createElement("p");
    paka.innerText = 
      object.label + "[" + object.confidence + "]" + 
      " , " + 
      object.x + 
      " , " + 
      object.y;
    document.getElementById('stat').appendChild(paka);

    noFill();
    stroke(255, 255, 255);
    strokeWeight(1.5);    

    rect(
      (object.x / 540) * 360 + ((object.width / 960)*640) / 2 - 10, 
      (object.y / 540) * 360 + ((object.height / 960)*640) / 2 - 10,
      20, 20
    );

    fill(0,255, 0);
    noStroke();
    text(
      round(object.confidence, 3), 
      (object.x / 540) * 360 + ((object.width / 960)*640) / 2 - 15,
      (object.y / 540) * 360 + ((object.height / 960)*640) / 2- 20
    )

    fill(255);
    circle(
      (object.x / 540) * 360 + ((object.width / 960)*640) / 2,
      (object.y / 540) * 360 + ((object.height / 960)*640) / 2,
      4
    );

    noFill();
    stroke(255);
    strokeWeight(1.5);
    let lol = round(random(0, detections.length-1));
    line(
      ((detections[lol].x) / 540) * 360 + ((detections[lol].width / 960)*640) / 2,
      ((detections[lol].y) / 540) * 360 + ((detections[lol].height / 960)*640) / 2, 
      (object.x / 540) * 360 + ((object.width / 960)*640) / 2, 
      (object.y / 540) * 360 + ((object.height / 960)*640) / 2
    );
  }
}
