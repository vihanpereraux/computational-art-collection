let dataTable;

let englandWalesDeman;
let embeddedWindGeneration;
let embeddedWindCapacity;
let embeddedSolorGeneration;
let embeddedSolorCapacity;

function preload(){
  dataTable = loadTable('source/data/historic_demand_year_2023.csv');
}

function setup() {
  frameRate(6);

  console.log("Row Count" , dataTable.getRowCount());
  console.log("Column Count" , dataTable.getColumnCount());
  console.log("Data" , dataTable.getString(0, 4));

  // for (let index = 1; index < dataTable.getRowCount(); index++) {
  //   console.log(dataTable.getString(index, 4));
  // }
  
  createCanvas(360, 640);
}

let randomXValue;
let randomYValue;
let randomWidth;
let randomHeight;

function draw() {
  clear()

  noFill();
  stroke(255);
  strokeWeight(.7);

  randomXValue = random(90, 120);
  randomYValue = random(170, 210);
  randomWidth = random(70, 100);
  randomHeight = random(80, 100);

  // line one
  line(
    0, 
    randomYValue + randomHeight/2, 
    randomXValue, 
    randomYValue + randomHeight/2);

  // line two
  line(
    randomXValue + randomWidth/2, 
    randomYValue + randomHeight, 
    randomXValue + randomWidth/2, 
    height);

  // line three
  line(
    randomXValue + randomWidth, 
    randomYValue + randomHeight/2, 
    width, 
    randomYValue + randomHeight/2);

  // line four
  line(
    randomXValue + randomWidth/2, 
    randomYValue, 
    randomXValue + randomWidth/2, 
    0);

  rect(
    randomXValue, 
    randomYValue, 
    randomWidth, 
    randomHeight);

  englandWalesDeman = dataTable.getString(Math.round(random(1, dataTable.getRowCount())), 4);
  embeddedWindGeneration = dataTable.getString(Math.round(random(1, dataTable.getRowCount())), 5);
  embeddedWindCapacity = dataTable.getString(Math.round(random(1, dataTable.getRowCount())), 6);
  embeddedSolorGeneration = dataTable.getString(Math.round(random(1, dataTable.getRowCount())), 7);
  embeddedSolorCapacity = dataTable.getString(Math.round(random(1, dataTable.getRowCount())), 8);
  
  console.log(englandWalesDeman); 

  textSize(10);
  fill(255);
  text(embeddedWindGeneration, randomXValue, randomYValue - 10);
  text(embeddedWindCapacity, (randomXValue + randomWidth) - 20, randomYValue - 10);
  text(embeddedSolorGeneration, randomXValue, (randomYValue + randomHeight) + 15);
  text(embeddedSolorCapacity, (randomXValue + randomWidth) - 25, (randomYValue + randomHeight) + 15);
}
