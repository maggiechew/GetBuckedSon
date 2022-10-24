import readline from "node:readline";
import { Writable } from "node:stream";
import { endgame } from "./index.js";
import { course } from "./index.js";
let timeoutId;
let userInput;
let value;
let userStatus;

import Audic from 'audic';

const bpm = new Audic('hundredSixtyBPM.mp3');

let mutableStdout = new Writable({
  write: function (chunk, encoding, callback) {
    if (!this.muted) process.stdout.write(chunk, encoding);
    callback();
  },
});

mutableStdout.muted = true;

function theWholeGame(course) {
  readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true,
  });
  resetTimer(course);
  process.on("exit", function (code) {
    clearTimeout(timeoutId);
    // console.log("Timeout ID (cleared) is: " + timeoutId);
    if (code !== 0) {
      return "Loser";
    } else return "Winner";
  });
}

// theWholeGame(course);
const TURN_LEFT = -1;
const TURN_RIGHT = 1;

function consoleResponse(course) {
  bpm.play();
  if (course[0] === TURN_RIGHT) {
    console.log("Turning Right!!");
  } else if (course[0] === TURN_LEFT) {
    console.log("Turning Left!!");
  } else {
    console.log("Error!!!!");
  }
}

function resetTimer(course) {
  clearTimeout(timeoutId);
  

  consoleResponse(course);
  timeoutId = setTimeout(() => {
    console.log("TOO LATE!");
    userStatus = "Loser";
    endgame(userStatus);
  }, 2000);
}

process.stdin.on("keypress", function (ch, key) {
  if (key.ctrl && key.name === "c") {
    process.stdin.pause();
  }
  value = key.sequence;
  giveResponse(value);
});

function giveResponse(thekey) {
  switch (thekey) {
    case "a":
      console.log("LEFT");
      userInput = TURN_LEFT;
      break;
    case "d":
      console.log("RIGHT");
      userInput = TURN_RIGHT;
      break;
    default:
      return;
  }
  if (course[0] + userInput != 0) {
    console.log("Ya got BUCKED, son!");
    userStatus = "Loser";
    clearTimeout(timeoutId);
    endgame(userStatus);
    return;
  }
  if (course.length === 1) {
    /// if we're at the last segment in the array
    clearTimeout(timeoutId);
    console.log(`\n\nYOU WIN!\n\n`);
    userStatus = "Winner";
    endgame(userStatus);
    return;
  } else {
    course.shift();
    resetTimer(course);
  }
}

export { theWholeGame, timeoutId };
