let socket;

let playbackRate = document.getElementById('playback-rate');
let xAxisRange = document.getElementById('x-axis-range');
let widthRange = document.getElementById('width-range');
let opacityRange = document.getElementById('opacity-range');

let playBackRateValue = document.getElementById('play-back-rate-value');
let xAxisRangeValue = document.getElementById('x-axis-range-value');
let widthRangeValue = document.getElementById('width-range-value');
let opacityRangeValue = document.getElementById('opacity-range-value');

socket = io.connect('http://172.20.10.3:3000/');

// initial values
playBackRateValue.innerText = playbackRate.value;
xAxisRangeValue.innerText = xAxisRange.value;
widthRangeValue.innerText = widthRange.value;
opacityRangeValue.innerText = opacityRange.value;
playbackRate.addEventListener('change', function(){
    playBackRateValue.innerText = playbackRate.value;
    executeMessage();
});
xAxisRange.addEventListener('change', function(){
    xAxisRangeValue.innerText = xAxisRange.value;
    executeMessage();
});
widthRange.addEventListener('change', function(){
    widthRangeValue.innerText = widthRange.value;
    executeMessage();
});
opacityRange.addEventListener('change', function(){
    opacityRangeValue.innerText = opacityRange.value;
    executeMessage();
});

// socket = io.connect('http://localhost:3000/');
function executeMessage(){
    let values = {
        playBackRateValue: playbackRate.value,
        xAxisRangeValue: xAxisRange.value,
        widthRangeValue: widthRange.value,
        opacityRangeValue: opacityRange.value,
    }
    socket.emit('mouse', values);
}

