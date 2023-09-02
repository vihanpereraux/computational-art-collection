let dataTable;

let randomSettlementDate;
let englandWalesDemand;
let embeddedWindGeneration;
let embeddedWindCapacity;
let embeddedSolorGeneration;
let embeddedSolorCapacity;

let randomXValue;
let randomYValue;
let randomWidth;
let randomHeight;

function preload(){
  dataTable = loadTable('source/data/historic_demand_year_2023.csv');
}

function setup() {
  frameRate(6);  
  createCanvas(360, 640);
}

function draw() {
  clear();
  blockOne();
}

function blockOne(){
  noFill();
  stroke(255);
  strokeWeight(.7);

  randomXValue = random(80, 120);
  randomYValue = random(170, 210);
  randomWidth = random(80, 110);
  randomHeight = random(80, 110);

  // get relative pointsss : ) 
  randomSettlementDate = Math.round(random(1, dataTable.getRowCount()));

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

  englandWalesDemand = dataTable.getString(randomSettlementDate, 4);
  console.log(englandWalesDemand);
  if(englandWalesDemand > 20000){
    stroke(255, 0, 0);
    strokeWeight(1);
    rect(
      randomXValue, 
      randomYValue, 
      randomWidth, 
      randomHeight);

    fill(255, 0, 0);
    strokeWeight(.5);
    text(englandWalesDemand, (randomXValue + randomWidth/2) - 10, randomYValue + randomHeight/2);
  }
  else{
    stroke(255);
    strokeWeight(1);
    rect(
      randomXValue, 
      randomYValue, 
      randomWidth, 
      randomHeight);

    fill(255);
    strokeWeight(.5);
    text(englandWalesDemand, (randomXValue + randomWidth/2) - 10, randomYValue + randomHeight/2);
  }

  embeddedWindGeneration = dataTable.getString(randomSettlementDate, 5);
  embeddedWindCapacity = dataTable.getString(randomSettlementDate, 6);
  embeddedSolorGeneration = dataTable.getString(randomSettlementDate, 7);
  embeddedSolorCapacity = dataTable.getString(randomSettlementDate, 8);

  textSize(10);
  fill(255);
  stroke(255);
  strokeWeight(.5);

  text(embeddedWindGeneration, randomXValue, randomYValue - 10);
  text(embeddedWindCapacity, (randomXValue + randomWidth) - 20, randomYValue - 10);
  text(embeddedSolorGeneration, randomXValue, (randomYValue + randomHeight) + 15);
  text(embeddedSolorCapacity, (randomXValue + randomWidth) - 25, (randomYValue + randomHeight) + 15);
}
