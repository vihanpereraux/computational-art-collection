let devider = 3
let videoOne;
let videoTwo;

function setup() {
  pixelDensity(3);

  let customCanvas = createCanvas(1080 / devider, 1920 / devider);
  customCanvas.position(
    (window.innerWidth - width)/2, 
    (window.innerHeight - height)/2);

  videoOne = createVideo('./videos/clip01.mp4');
  videoOne.size(1080 / devider, 1920 / devider);
  videoOne.autoplay();
  videoOne.volume(0);
  videoOne.loop();
  videoOne.hide();

  videoTwo = createVideo('./videos/clip02.mp4');
  videoTwo.size(1080 / devider, 1920 / devider);
  videoTwo.autoplay();
  videoTwo.volume(0);
  videoTwo.loop();
  videoTwo.hide();
}

function draw() {
  smooth();
  image(videoTwo, 0, 0, width, height);
  let tintValue = 200;
  tint(tintValue, tintValue, tintValue);
  filter(OPAQUE);
}
