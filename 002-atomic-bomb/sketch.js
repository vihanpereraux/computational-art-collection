let devider = 3;
let canvasColor = 30;
let mideaElement = document.getElementById('clip');
let randomTimeStamp;
let randomizer;
let intervalOne;
let intervalTwo;
let footageNames = [];
let intervalCounter;
let dataTable;

intervalOne = setInterval(() => {
  randomizer = round(random(-50, 50));
  randomTimeStamp = round(random(0, 3*60) + randomizer);
  // console.log(randomTimeStamp);
  mideaElement.currentTime = randomTimeStamp;
}, 250);

footageNames = [
  'footage-one.mp4',
  'footage-two.mp4',
  'footage-three.mp4',
]
intervalCounter = 10;

intervalTwo = setInterval(() => {
  mideaElement.src = './assets/vids/' + footageNames[round(random(0, 2))];
  intervalCounter = intervalCounter + 5;
}, 4000);

function preload(){
  dataTable = loadTable('assets/data/data.csv');
}

function setup() {
  createCanvas(1080/devider, 1920/devider);
  background(canvasColor);
  console.log("Row Count" , dataTable.getRowCount());
  console.log("Column Count" , dataTable.getColumnCount());
  console.log("Data" , dataTable.getString(2, 1));
}

function draw() {

}
