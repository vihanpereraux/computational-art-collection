// block one
let blockOneKeyImage;
let blockOneOtherImages;

let devider = 3;

function setup() {
  frameRate(6);
  createCanvas(1080/devider, 1920/devider);
}

function draw() {
  clear();

  blockOne();

  fill(255);
  stroke(255);
  strokeWeight(2)
  rect(
    random(185, 195), 
    random(170, 185), 
    50, 
    50);
}

function blockOne(){
  blockOneKeyImage = document.getElementById('block-one-key-image');
  blockOneKeyImage.src = 'https://i.ibb.co/d6mFXvg/img-001.png';
}
