let clip01;
let clip02;
let clip03;
let clip04;
let splashScreen = false;
let clip01Play = false;
let clip02Play = false;
let clip03Play = false;
let clip04Play = false;


function setup() {
  clip01 = createVideo('./videos/clip01.mp4');
  clip01.size(360, 640);
  clip01.play()
  clip01.volume(0);
  clip01.loop();
  clip01.hide();

  clip02 = createVideo('./videos/clip02.mp4');
  clip02.size(360, 640);
  clip02.play()
  clip02.volume(0);
  clip02.loop();
  clip02.hide();

  clip03 = createVideo('./videos/clip03.mp4');
  clip03.size(360, 640);
  clip03.play()
  clip03.volume(0);
  clip03.loop();
  clip03.hide();

  clip04 = createVideo('./videos/clip04.mp4');
  clip04.size(360, 640);
  clip04.play()
  clip04.volume(0);
  clip04.loop();
  clip04.hide();

  let devider = 3;
  let customCanvas = createCanvas(
    1080 / devider, 
    1920 / devider);
  customCanvas.position(
    (window.innerWidth - width)/2, 
    (window.innerHeight - height)/2);
}

function draw() {
  background(0);

  if(clip01Play){
    image(clip01, 0, 0, width, height);
    filter(POSTERIZE, 100);
  }
  if(clip02Play){
    image(clip02, 0, 0, width, height);
    filter(POSTERIZE, 100);
  }
  if(clip03Play){
    image(clip03, 0, 0, width, height);
    filter(POSTERIZE, 100);
  }
  if(clip04Play){
    image(clip04, 0, 0, width, height);
    filter(POSTERIZE, 100);
  }

  if(keyIsDown(83)){
    fill(255);
    noStroke();
    rect(0, 0, width, height);
  }
}

function keyPressed() {
  switch (keyCode) {
    case 49:
      clip01Play = true;
      clip02Play = false;
      clip03Play = false;
      clip04Play = false;
      break;

    case 50:
      clip01Play = false;
      clip02Play = true;
      clip03Play = false;
      clip04Play = false;
      break;

    case 51:
      clip01Play = false;
      clip02Play = false;
      clip03Play = true;
      clip04Play = false;
      break;

    case 52:
      clip01Play = false;
      clip02Play = false;
      clip03Play = false;
      clip04Play = true;
      break;
  
    default:
      break;
  }
}
