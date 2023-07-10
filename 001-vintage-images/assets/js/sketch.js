let aspectRatio = 16/9;
let canvasWidth = 390;
let canvasHeight = canvasWidth*aspectRatio;

function setup() {
  frameRate(10);
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  angleMode(DEGREES);
  translate(canvasWidth/2, canvasHeight/2);
  clear();
  moduleOne();
}

function moduleOne(){
  let counter = random(180, 250);
  noFill();
  stroke(225);
  
  for (let index = 0; index < 50; index++) {
    strokeWeight(1);
    rotate(random(90, -90));
    line((counter/2)*-1, 0, counter/2+50, 0);

    strokeWeight(1);
    circle(0, 0, counter);
    counter -= 20;
  }
}
