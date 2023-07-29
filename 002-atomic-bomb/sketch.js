let devider = 3;
let canvasColor = 30;
let mideaElement = document.getElementById('clip');
let randomTimeStamp;
let randomizer;

let intervalOne;
let intervalTwo;
let intervalThree;
let intervalFour;
let intervalFive;

let footageNames = [];
let intervalCounter;
let dataTable;
let city = document.getElementById('city');
let latitude = document.getElementById('latitude');
let longitude = document.getElementById('longitude');
let randomCity;

let image01 = document.getElementById('image-01');
let image02 = document.getElementById('image-02');
let image03 = document.getElementById('image-03');
let paperTapeOne = document.getElementById('paper-tape-one');
let paperTapeTwo = document.getElementById('paper-tape-two');
let year = document.getElementById('year');
let yeildLower = document.getElementById('yeild-lower');
let yeildUpper = document.getElementById('yeild-upper');

intervalOne = setInterval(() => {
  randomizer = round(random(-50, 50));
  randomTimeStamp = round(random(0, 3*60) + randomizer);
  mideaElement.currentTime = randomTimeStamp;
}, 250);

footageNames = [
  'footage-one.mp4',
  'footage-two.mp4',
  'footage-three.mp4',
]
intervalTwo = setInterval(() => {
  mideaElement.src = './assets/vids/' + footageNames[round(random(0, 2))];
}, 4000);


intervalThree = setInterval(() => {
  image01.style.display = 'none';
  image03.style.display = 'block';
}, 2000);
intervalFour = setInterval(() => {
  image01.style.display = 'block';
  image03.style.display = 'none';
}, 4000);


function preload(){
  dataTable = loadTable('assets/data/data.csv');
}

function setup() {
  frameRate(6);
  createCanvas(1080/devider, 1920/devider);
  console.log("Row Count" , dataTable.getRowCount());
  console.log("Column Count" , dataTable.getColumnCount());
  console.log("Data" , dataTable.getString(2, 1));
}

function draw() {
  let randomRowCount = round(random(0, dataTable.getRowCount()));
  
  randomCity = dataTable.getString(randomRowCount, 1);
  
  let location = {
    Latitude: dataTable.getString(randomRowCount, 3),
    Longitude: dataTable.getString(randomRowCount, 4),
    date: dataTable.getString(randomRowCount, 13) + " " +
     dataTable.getString(randomRowCount, 14) + " " + 
     dataTable.getString(randomRowCount, 15),
    yeildLower: dataTable.getString(randomRowCount, 8),
    yeildUpper: dataTable.getString(randomRowCount, 9)
  }
  console.log(location);

  city.innerText = randomCity;
  latitude.innerText = location.Latitude;
  longitude.innerText = location.Longitude;
  year.innerText = location.date;
  yeildLower.innerText = location.yeildLower;
  yeildUpper.innerText = location.yeildUpper;

  let multiplierOne = (round(random(-15, 15)));
  let multiplierTwo = (round(random(10, -10)));
  noFill();
  stroke(255, 0, 0);
  strokeWeight(.3);
  circle(
    location.Latitude * multiplierOne,
    location.Longitude * multiplierTwo,
    40
  );

  fill(255, 0, 0);
  noStroke();
  circle(
    location.Latitude * multiplierOne,
    location.Longitude * multiplierTwo,
    5
  );

  noFill();
  stroke(255);
  strokeWeight(.2);
  line(
    width/2,
    height/2,
    location.Latitude * multiplierOne,
    location.Longitude * multiplierTwo
  );
  
  if(true){
    image01.src = citeImages[round(random(0, citeImages.length-1))][0];
    image02.src = citeImages[round(random(0, citeImages.length-1))][0];
    image03.src = citeImages[round(random(0, citeImages.length-1))][0];
  }

  let rotatevalue = round(random(2,-2));
  paperTapeOne.style.transform = 'translateX(-50%) rotate(' +  rotatevalue * random(-2, 2)  + 'deg)';
  paperTapeTwo.style.transform = 'translateX(-50%) rotate(' +  rotatevalue  + 'deg)';
}
