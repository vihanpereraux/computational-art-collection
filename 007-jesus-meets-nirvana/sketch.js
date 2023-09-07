let test = document.getElementById('test');
let images = [];
let img; 
let imageSize;

let ears1;
let ears2;
let tongue;
let eyes1; 
let eyes2; 

function preload(){
  for (let i = 0; i < 8; i++) {
    img = loadImage('./samples/images/image_0' + String(i + 1) + '.png');
    images.push(img)
  }
}

function setup(){
  frameRate(10);
  pixelDensity(1); 

  let customCanvas = createCanvas(500, window.innerHeight - 20);
  customCanvas.parent('test');

  // border
  noFill();
  noStroke();
  rect(0, 0, width, height)

  ears1 = {x: 180, y: height * 0.3}
  ears2 = {x: 320, y: height * 0.3}
  tongue = {x: 250, y: height * 0.37}
  eyes1 = {x: 220, y: height * 0.25}
  eyes2 = {x: 290, y: height * 0.25}
}

function draw(){
  clear();

  effectB()
  
  effectA()
}

function effectA(){
  noFill();
  stroke(255);

  // ears
  fill(255);
  circle(ears1.x, ears1.y, 5);
  noFill();
  circle(ears1.x, ears1.y, 25);
  
  fill(255);
  circle(ears2.x, ears2.y, 5);
  noFill();
  circle(ears2.x, ears2.y, 25);

  // tongue
  fill(255);
  circle(tongue.x, tongue.y, 5);
  noFill();
  circle(tongue.x, tongue.y, 25);

  // eyes
  fill(255);
  circle(eyes1.x, eyes1.y, 5);
  noFill();
  circle(eyes1.x, eyes1.y, 25);

  fill(255);
  circle(eyes2.x, eyes2.y, 5);
  noFill();
  circle(eyes2.x, eyes2.y, 25);

  // touch
  fill(255);
  circle(48, height * 0.35, 5);
  noFill();
  circle(48, height * 0.35, 25);
  // touch2
  fill(255);
  circle(440, height * 0.7, 5);
  noFill();
  circle(440, height * 0.7, 25);

  let cordPool1 = [
    {x: 48, y: height * 0.35},
    {x: 440, y: height * 0.7},
  ];
  let cordPool2 = [
    {x: eyes1.x, y: eyes1.y},
    {x: eyes2.x, y: eyes2.y},
  ];

  // triangle(
  noFill();
  if(localStorage.getItem('body/touch') == 'true'){
    let pointThree = {x:250, y:height * 0.37}
    let randomVal = round(random(0, cordPool2.length-1)); 
    strokeWeight(1.5);
    triangle(
      cordPool1[randomVal].x, cordPool1[randomVal].y,
      cordPool2[randomVal].x, cordPool2[randomVal].y,
      pointThree.x, pointThree.y
      );
  }
  else{
    noStroke();
    triangle(
      100, height * 0.36,
      200, height * 0.3,
      250, height * 0.37
    );
  }

  if(localStorage.getItem('eyes') == 'true'){
    stroke(255);
    strokeWeight(1.5);
    line(eyes1.x, eyes1.y, eyes2.x, eyes2.y);
  }
  else{
    noStroke();
    line(eyes1.x, eyes1.y, eyes2.x, eyes2.y);
  }

  if(localStorage.getItem('ears') == 'true'){
    stroke(255);
    strokeWeight(1.5);
    let randomVal = round(random(0, cordPool2.length-1)); 
    triangle(
      ears1.x, ears1.y,
      cordPool2[randomVal].x, cordPool2[randomVal].y,
      ears2.x, ears2.y);
  }
}

function effectB(){
  imageSize = width * 0.32;
  image(
    images[round(random(0, 7))], 
    175, 
    height * .56, 
    imageSize, 
    imageSize);
}