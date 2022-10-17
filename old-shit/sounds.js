// const sound = require("sound-play");
// sound.play("./eat.mp3");

import Audic from "audic";

const whipSound = new Audic("whip.wav");

function setUpSound() {
  console.log("starting the sound");
  whipSound.play();
  // console.log("done loading");

  setTimeout(() => {
    whipSound.pause();
    // console.log("paused");
    // console.log("now we go")
    //     audic.play();
    //     audic.addEventListener('ended', () => {
    //         audic.destroy();
    //     });
  }, 100);
}

function executeSound() {
  setTimeout(() => {
    // console.log("now we go");
    whipSound.play();

    setTimeout(() => {
      console.log("Stopping sound");
      whipSound.destroy();
    }, 1000);
  }, 2000);
}

// setUpSound()

export { setUpSound, executeSound };
