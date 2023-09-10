let socket;

function setup() {
  createCanvas(400, 400);
  socket = io.connect('http://localhost:3000/');

  let d = "Vihan";
  socket.emit('mouse', d);
}

function draw() {
  background(220);
}
