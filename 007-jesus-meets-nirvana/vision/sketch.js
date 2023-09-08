let test = document.getElementById('test');
let test2 = document.getElementById('test2');
let video;
let video2;
let detector;
let detections = [];
let stat = document.getElementById('stat');
let playButton = document.getElementById('play-button');
let isVideoPlaying = false;


// canvas 01
function setup() {
  let customCanvas = createCanvas(854, 480);
  customCanvas.parent('test');
  video2 = createVideo('./samples/sample.mp4', videoReady);
  video2.size(width, height);
  video2.loop();
  video2.volume(0);
  video2.hide();

  localStorage.setItem("eyes", "false");
  localStorage.setItem("ears", "true");
  localStorage.setItem("nose", "false");
  localStorage.setItem("tongue", "false");
  localStorage.setItem("body/touch", "flase");
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

  // 5 senses catog
  // women/men - eyes, body
  // sounds - ear
  // food - tongue
  // perfume - nose
  
  // bounderies
  for (let i = 0; i < detections.length; i += 1) {
    // updating local storage
    switch (detections[i].label) {
      case "person":
        localStorage.setItem("eyes", "true");
        localStorage.setItem("ears", "true");
        localStorage.setItem("nose", "false");
        localStorage.setItem("tongue", "false");
        localStorage.setItem("body/touch", "true");  
        break;
    
      case "car":
        localStorage.setItem("eyes", "true");  
        localStorage.setItem("ears", "true");
        localStorage.setItem("nose", "false");
        localStorage.setItem("tongue", "false");
        localStorage.setItem("body/touch", "flase");
        break;
      
    }

    const object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(2);
    noFill();
    rect(
      object.x, 
      object.y, 
      object.width, 
      object.height);

    // labels
    noStroke();
    fill(255);
    textSize(12);
    let gg = " "
    if(object.label == 'person'){gg = 'human[m/f]'}
    text(gg, object.x + 10, object.y + 24);
    text(round(object.confidence, 5), object.x + object.width/2, object.y + object.height/2);

    // lines
    let lolz = Math.round(random(0, detections.length - 1));
    let lolz1 = Math.round(random(0, detections.length - 1));
    if(detections.length > 1){
      console.log(detections);
      stroke(255);
      strokeWeight(1.5);
      line(
        (detections[lolz1].width)/2 + detections[lolz1].x, 
        (detections[lolz1].height)/2 + detections[lolz1].y,
        (detections[lolz].width)/2 + detections[lolz].x, 
        (detections[lolz].height)/2, + detections[lolz].y)
      }
  }

  // stat
  if(detections.length > 1){
    for (let i = 0; i < detections.length; i += 1) {
      let varName = String(round(random(0, 100)));
      varName = document.createElement('p');
      stat.appendChild(varName);
      varName.innerText = 
      round(detections[i].x, 3) 
      + " - " + 
      round(detections[i].y, 3)
      + " - " + 
      round(detections[i].confidence, 3);
    }
  }
}
