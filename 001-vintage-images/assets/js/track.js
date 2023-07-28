// video feed
const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");
let detailLogWrapper = document.getElementById("detail-log-wrapper");

let isVideo = false;
let model = null;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 2,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

function toggleVideo() {
    if (!isVideo) {
        startVideo();
    } else {
        handTrack.stopVideo(video)
        isVideo = false;
    }
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        // console.log("video started", status);
        if (status) {
            isVideo = true
            runDetection()
        } else {
            updateNote.innerText = "Please enable video"
        }
    });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    model = lmodel
    trackButton.disabled = false
});

function runDetection() {
    model.detect(video).then(predictions => {
        if(predictions.length == 0){
            console.log("Predictions: No results");
        }
        else{
            console.log("Predictions: ", predictions[0].bbox);
            console.log("Predictions: ", predictions[0].class);
            console.log("Predictions: ", predictions[0].label);
            console.log("Predictions: ", predictions[0].score);
        }
        // detailLogWrapper.innerText = predictions[0].class;
        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}

