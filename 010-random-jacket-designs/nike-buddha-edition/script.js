// p5.js Video capture
let myCapture;
// OpenCV capture helper
let myCVCapture;
// (RGBA) Mat to store the latest color camera frame
let myMat;
// RGB mat
let myMatRGB;
// one frame of background
let myBackgroundMat;
// foreground - background difference Mat
let differenceMat;
let customCanvas

function setup() {
  pixelDensity(10)
  customCanvas = createCanvas(360, 640);
  customCanvas.position((window.innerWidth - width)/2, (window.innerHeight - height)/2)
  
  // setup p5 capture
  myCapture = createVideo('./videos/clip02.mp4');
  myCapture.size(360, 640);
  myCapture.loop();
  myCapture.volume(0);
  myCapture.id('feed');
//   myCapture.hide();
  
  // wait for OpenCV to init
  p5.cv.onComplete = onOpenCVComplete;
}

function onOpenCVComplete() {
  // create a CV capture helper
  myCVCapture = p5.cv.getCvVideoCapture(myCapture);
  // create a CV Mat to read new color frames into
  myMat = p5.cv.getRGBAMat(360, 640);
  myMatRGB = p5.cv.getRGBMat(360, 640);
  // init background pixels
  myBackgroundMat = p5.cv.getRGBMat(360, 640);
  // init diff. pixels
  differenceMat = p5.cv.getRGBMat(360, 640);
}

function draw() {
  if (p5.cv.isReady) {
    // Difference between the current frame and the stored background
    let presenceSum = 0;
    // read from CV Capture into myMat
    myCVCapture.read(myMat);
    // convert to from RGBA to RGB

    // p5.cv.convertColor(myMat, myMatRGB, cv.COLOR_RGB2XYZ);
    // p5.cv.convertColor(myMat, myMatRGB, cv.COLOR_BGR2XYZ);

    // p5.cv.convertColor(myMat, myMatRGB, cv.COLOR_BGR2YCrCb);

    p5.cv.convertColor(myMat, myMatRGB, cv.COLOR_RGB2Luv);
    
    // Compute the absolute difference of the red, green, and blue channels
    // subtract myBackgroundMat from myMat and store result
    cv.absdiff(myMatRGB, myBackgroundMat, differenceMat);
    // display difference Mat
    p5.cv.drawMat(differenceMat, 0, 0, width, height);
    tint(255, 20);
    // Add these differences to the running tally
    presenceSum = p5.cv.sumData(differenceMat.data);
    // Print out the total amount of movement
    console.log(presenceSum / (differenceMat.total() * 255 * 3));
    // console.log('test');
  }
}

function mouseClicked() {
  saveCanvas(customCanvas);
}

setInterval(() => {
  if (p5.cv.isReady){
    p5.cv.copyRGB(myMat, myBackgroundMat);
  }
}, 400);
