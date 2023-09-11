let socket;

let playbackRate;
let xAxisRange;
let yAxisRange;

socket = io.connect('http://localhost:3000/');
let d = "Vihan";
socket.emit('mouse', d);

