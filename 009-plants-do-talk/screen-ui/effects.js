setTimeout(() => {
    let video;
    let playbackRate = document.getElementById('playback-rate');

    video = document.getElementById('oaka');
    
    playbackRate.addEventListener('change', function(){
        video.playbackRate = playbackRate.value;
    });
}, 1000);