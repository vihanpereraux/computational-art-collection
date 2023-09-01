function setup() {
  createCanvas(360, 640);
}

function draw() {
  frameRate(7)
  clear()

  noFill();
  stroke(255);
  strokeWeight(.7);
  rect(
    random(100, 110), 
    random(180, 200), 
    random(70, 90), 
    random(70, 90));
}
