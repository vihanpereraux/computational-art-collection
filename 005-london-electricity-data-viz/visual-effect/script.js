let blockNumber = prompt('Enter the block number');
localStorage.setItem("blockNumber", blockNumber);

var width = 360*2;
var height = 640*2;

var waterModel = new WaterModel(width, height, {
    resolution: 2.0,
    // interpolate:false,
    interpolate: true,
    damping: 0.985,
    clipping: 5,
    evolveThreshold: 0.05,
    maxFps: 30,
    showStats: false
});

var finger = [
    [0.5, 1.0, 0.5],
    [1.0, 1.0, 1.0],
    [0.5, 1.0, 0.5]
];

function blockOne(imageName) {
    var waterModel = new WaterModel(width, height, {
        resolution: 2.0,
        // interpolate:false,
        interpolate: true,
        damping: 0.985,
        clipping: 5,
        evolveThreshold: 0.05,
        maxFps: 30,
        showStats: false
    });

    var waterCanvas = new WaterCanvas(width, height,
        "waterHolder", waterModel, {
        backgroundImageUrl: "images/" + imageName,
        lightRefraction: 6,
        lightReflection: .01,
        maxFps: 60,
        showStats: false
    });

    var finger = [
        [0.5, 1.0, 0.5],
        [1.0, 1.0, 1.0],
        [0.5, 1.0, 0.5]
    ];

    // Math.floor(Math.random() * (max - min) ) + min;
    let xMax, xMin, yMax, yMin;
    let multiplier = 2;
    xMax = 180 * multiplier;
    xMin = 120 * multiplier;
    yMax = 250 * multiplier;
    yMin = 210 * multiplier;

    setInterval(() => {
        for (let index = 0; index < 50; index++) {
            waterModel.touchWater(
                Math.floor(Math.random() * (xMax - xMin)) + xMin,
                // 180, 
                Math.floor(Math.random() * (yMax - yMin)) + yMin,
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

function blockTwo(imageName){
    var waterCanvas = new WaterCanvas(width, height,
        "waterHolder", waterModel, {
        backgroundImageUrl: "images/" + imageName,
        // lightRefraction: Math.floor(Math.random() * (5 - 1) ) + 1,
        lightRefraction: 8,
        lightReflection: .01,
        maxFps: 60,
        showStats: false
    });

    // Math.floor(Math.random() * (max - min) ) + min;
    let xMax, xMin, yMax, yMin;
    let multiplier = 2;
    xMax = 200 * multiplier;
    xMin = 160 * multiplier;
    yMax = 200 * multiplier;
    yMin = 160 * multiplier;

    setInterval(() => {
        for (let index = 0; index < 50; index++) {
            waterModel.touchWater(
                Math.floor(Math.random() * (xMax - xMin)) + xMin,
                // 180, 
                Math.floor(Math.random() * (yMax - yMin)) + yMin,
                // 320, 
                .5,
                finger);
            // waterModel.touchWater(180, 320, .5, finger);
        }
    }, 300);

    document.getElementById('waterHolder').addEventListener('mousemove', function (event) {
        waterModel.touchWater((event.clientX - 340), (event.clientY - 30), .5, finger);
    });
}

function blockThree(imageName){
    var waterCanvas = new WaterCanvas(width, height,
        "waterHolder", waterModel, {
        backgroundImageUrl: "images/" + imageName,
        // lightRefraction: Math.floor(Math.random() * (5 - 1) ) + 1,
        lightRefraction: 8,
        lightReflection: .01,
        maxFps: 60,
        showStats: false
    });

    // Math.floor(Math.random() * (max - min) ) + min;
    let xMax, xMin, yMax, yMin;
    let multiplier = 2;
    xMax = 270 * multiplier;
    xMin = 200 * multiplier;
    yMax = 370 * multiplier;
    yMin = 340 * multiplier;
    
    setInterval(() => {
        for (let index = 0; index < 100; index++) {
            waterModel.touchWater(
                Math.floor(Math.random() * (xMax - xMin)) + xMin,
                // 180, 
                Math.floor(Math.random() * (yMax - yMin)) + yMin,
                // 0, 
                .5,
                finger);
            // waterModel.touchWater(180, 320, .5, finger);
        }
    }, 300);

    document.getElementById('waterHolder').addEventListener('mousemove', function (event) {
        waterModel.touchWater((event.clientX - 340), (event.clientY - 30), .5, finger);
    });
}

setTimeout(() => {
    switch (blockNumber) {
        case "1":
            blockOne("image_01.jpg");
            break;

        case "2":
            blockTwo("image_02.jpg");
            break;

        case "3":
            blockThree("image_03.jpg");
            break;
    
        default:
            break;
    }
}, 100);