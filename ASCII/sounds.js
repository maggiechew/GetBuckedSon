// const sound = require("sound-play");
// sound.play("./eat.mp3");

import Audic from 'audic';

const audic = new Audic('whip.wav');

async function theSound () {
    console.log("starting the music")
    audic.play();
    console.log("done loading")
    audic.pause();
    console.log("waiting")
    setTimeout(() => {
        console.log("now we go")
        audic.play();
        audic.addEventListener('ended', () => {
            audic.destroy();
        });
    }, 5000)
}

theSound()
