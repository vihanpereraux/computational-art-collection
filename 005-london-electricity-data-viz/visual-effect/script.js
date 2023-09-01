var width = 360;
var height = 640;

function dummy() {
    var waterModel = new WaterModel(width, height, {
        resolution: 2.0,
        // interpolate:false,
        interpolate: true,
        damping: 0.985,
        clipping: 5,
        evolveThreshold: 0.05,
        maxFps: 30,
        showStats: true
    });

    var waterCanvas = new WaterCanvas(width, height,
        "waterHolder", waterModel, {
        // Math.floor(Math.random() * (max - min) ) + min;
        backgroundImageUrl: "images/image_01.jpg",
        lightRefraction: Math.floor(Math.random() * (5 - 1) ) + 1,
        lightReflection: .01,
        maxFps: 60,
        showStats: true
    });

    var finger = [
        [0.5, 1.0, 0.5],
        [1.0, 1.0, 1.0],
        [0.5, 1.0, 0.5]
    ];

    // Math.floor(Math.random() * (max - min) ) + min;

    setInterval(() => {
        for (let index = 0; index < 50; index++) {
            waterModel.touchWater(
                Math.floor(Math.random() * (150 - 180)) + 180,
                // 180, 
                Math.floor(Math.random() * (200 - 250)) + 250,
                // 320, 
                .5,
                finger);
            // waterModel.touchWater(180, 320, .5, finger);
        }
    }, 300);

    document.getElementById('waterHolder').addEventListener('mousemove', function (event) {
        waterModel.touchWater((event.clientX - 340), (event.clientY - 30), .5, finger);
    })
}

setTimeout(() => {
    dummy();
}, 100);