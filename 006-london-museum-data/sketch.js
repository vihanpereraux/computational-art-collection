let xoff = 0;
let start = 0;

function setup() {
  // createCanvas(window.innerWidth, window.innerHeight);
  createCanvas(400, 400);
  // createCanvas(200, 200);
}

function draw() {
  background(50);

  // let x = random(width);
  xoff += 0.02;
  let x = map(noise(xoff), 0, 1, 0, width);
  let y = map(noise(xoff + 1000), 0, 1, 0, height);

  noFill();
  stroke(255);
  ellipse(x, y, 25, 25);

  beginShape();
  stroke(255);  
  noFill();
  let xoff2 = start;
    for (let index = 0; index < width; index++) {
      stroke(255);
      let y = noise(xoff2) * height
      vertex(index, y);  
      xoff2 += 0.005;
    }
  endShape();

  start += 0.02;
  // noLoop();
}
