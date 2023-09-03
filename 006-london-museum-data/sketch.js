let start = 0;

function setup() {
  // createCanvas(window.innerWidth, window.innerHeight);
  // createCanvas(400, 400);
  createCanvas(200, 200);
  pixelDensity(1);
}

function draw() {
  let xoff = 0;
  background(50);
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // let r = random(0, 255);
      let r = noise(xoff) * 255;
      let index = (x + y * width) * 4;
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;

      xoff += 0.01;
    }
  }
  updatePixels();

  // noLoop();
}
