document.getElementById('play-btn').addEventListener(
    'click', function(){
        document.getElementById('footage-two').play();
    }
);

document.getElementById('skip-btn').addEventListener(
    'click', function(){
        document.getElementById('footage-two').currentTime = 10;
        setTimeout(() => {
            document.getElementById('footage-two').play();
        }, 1000);
    }
);

