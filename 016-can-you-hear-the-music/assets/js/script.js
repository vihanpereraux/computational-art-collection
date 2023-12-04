var hydra = new Hydra({ detectAudio: false });

let rgbDevider = 255;
let volumeLevel = 0;

// mouse coords
let mouseXPosition = 0.0;
document.addEventListener('mousemove', function (e) {
    mouseXPosition = e.clientX;
});

// microphone input
let envVolume;
document.getElementById('access-button').addEventListener('click', function () {
    getLocalStream();
});

function getLocalStream() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            const audioContext = new AudioContext();
            const audioSource = audioContext.createMediaStreamSource(stream);
            const scriptNode = audioContext.createScriptProcessor(4096, 1, 1);

            audioSource.connect(scriptNode);
            scriptNode.connect(audioContext.destination);

            // Function to calculate volume level
            function calculateVolume(buffer) {
                let sum = 0;
                for (let i = 0; i < buffer.length; i++) {
                    sum += Math.abs(buffer[i]);
                }
                return sum / buffer.length;
            }

            scriptNode.onaudioprocess = function (event) {
                const inputData = event.inputBuffer.getChannelData(0);
                const volume = calculateVolume(inputData);

                // Log the volume level to the console
                let multiplier = 1000;
                volumeLevel = (volume * multiplier) * 100;
                console.log('Volume level:', volume * multiplier);
                console.log('Volume level:', volumeLevel);
                envVolume = volume * multiplier;
            };
        })
        .catch(function (err) {
            console.error('Error accessing the microphone:', err);
        });
}

osc(9, -0.1, 0.5)
    .modulate(noise(() => volumeLevel, 0.5))
    .color(300 / rgbDevider, 150 / rgbDevider, 0 / rgbDevider)
    .repeat(1.5, 1.5, 0.0, 0.0)
    .modulateRepeat(
        noise(4, 0.1),
        () => volumeLevel * .01, // triggers
        () => volumeLevel * .01, // triggers
        0.5, () => Math.sin(time * .5))
    .modulateKaleid(
        osc(11, 0.5, 0)
            .kaleid(50)
            .scale(() => Math.sin(time * .5) * 2),
        () => volumeLevel + 1)
    // don't mess
    .modulate(
        noise(10, 0.1)
            .rotate(10, .5),
        .1)
    .out()