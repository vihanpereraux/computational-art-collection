// block one
let blockOneKeyImage;
let blockOneOtherImages;

let devider = 3;

function setup() {
  createCanvas(1080/devider, 1920/devider);
  background(220);
}

function draw() {
  blockOne();
  // fill(255, 0, 0)
  // circle(mouseX, mouseY, 20, 20)
}

function blockOne(){
  blockOneKeyImage = document.getElementById('block-one-key-image');
  blockOneKeyImage.src = 'https://i.ibb.co/d6mFXvg/img-001.png';
}
