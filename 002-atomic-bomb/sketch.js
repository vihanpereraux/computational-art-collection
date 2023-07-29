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
  // image02.style.display = 'block';
  image03.style.display = 'block';
}, 2000);
intervalFour = setInterval(() => {
  image01.style.display = 'block';
  image03.style.display = 'none';
}, 4000);
intervalFive = setInterval(() => {
  // image02.style.display = 'none';
}, 6000);


let citeImages = [
  ['./assets/images/alamogordo/img-01.jpg' ,'alamogordo'],
  ['./assets/images/alamogordo/img-02.jpg' ,'alamogordo'],
  ['./assets/images/alamogordo/img-03.jpg' ,'alamogordo'],
  ['./assets/images/alamogordo/img-04.jpg' ,'alamogordo'],
  ['./assets/images/alamogordo/img-05.jpg' ,'alamogordo'],
  ['./assets/images/alamogordo/img-06.jpg' ,'alamogordo'],
];

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
    Longitude: dataTable.getString(randomRowCount, 4)
  }
  console.log(randomCity)
  city.innerText = randomCity;

  latitude.innerHTML = location.Latitude;
  longitude.innerHTML = location.Longitude;

  let multiplierOne = (round(random(-15, 15)));
  let multiplierTwo = (round(random(10, -10)));
  noFill();
  stroke(255);
  strokeWeight(.3);
  circle(
    location.Latitude * multiplierOne,
    location.Longitude * multiplierTwo,
    40
  );

  fill(255);
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
    image01.src = citeImages[round(random(0, 5))][0];
    image02.src = citeImages[round(random(0, 5))][0];
    image03.src = citeImages[round(random(0, 5))][0];
  }
}
