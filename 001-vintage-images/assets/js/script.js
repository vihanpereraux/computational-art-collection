let intervalOne;
let loopTime;
let randomIndex;
let imageArray = []

let image = document.getElementById('image');
imageArray = [
    './assets/img/img-01.jpeg',
    './assets/img/img-02.jpeg',
    './assets/img/img-03.jpeg',
    './assets/img/img-04.jpeg',
    './assets/img/img-05.jpeg',
    './assets/img/img-06.jpeg',
    './assets/img/img-07.jpeg',
    './assets/img/img-08.jpeg',
    './assets/img/img-09.jpeg',
    './assets/img/img-10.jpeg',
]
loopTime = 100;
intervalOne = setInterval(() => {
    randomIndex = Math.floor(Math.random() * 10)
    image.src = imageArray[randomIndex]
}, loopTime);
