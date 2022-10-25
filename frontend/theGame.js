import readline from "node:readline";
import { Writable } from "node:stream";
import { endgame, course, clearConsoleAndScrollbackBuffer } from "./index.js";
import { turningLeft, turningRight, leanedLeft, leanedRight, correct } from "./frontend-Objects.js";
import chalk from 'chalk';
const log = console.log;
// import { course } from "./index.js";
let timeoutId;
let userInput;
let value;
let userStatus;
let gameScore;

import Audic from "audic";
import { clear } from "node:console";

const bpm = new Audic("hundredSixtyBPM.mp3");

let mutableStdout = new Writable({
  write: function (chunk, encoding, callback) {
    if (!this.muted) process.stdout.write(chunk, encoding);
    callback();
  },
});

mutableStdout.muted = true;

function theWholeGame(course) {
  gameScore = 0;
  readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true,
  });
  resetTimer(course);
  process.on("exit", function (code) {
    clearTimeout(timeoutId);
    // console.log("Timeout ID (cleared) is: " + timeoutId);
    //   if (code !== 0) {
    //     return "Loser";
    //   } else return "Winner";
  });
}

// theWholeGame(course);
const TURN_LEFT = -1;
const TURN_RIGHT = 1;

function consoleResponse(course) {
  bpm.play();
  if (course[0] === TURN_RIGHT) {
    console.log(turningRight);
  } else if (course[0] === TURN_LEFT) {
    console.log(turningLeft);
  } else {
    console.log("Error!!!!");
  }
}

function resetTimer(course) {
  clearTimeout(timeoutId);

  consoleResponse(course);
  timeoutId = setTimeout(() => {
    clearConsoleAndScrollbackBuffer();
    userStatus = "Loser";
    endgame(userStatus, gameScore, "toolate");
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
      // console.log(leanedLeft);
      userInput = TURN_LEFT;
      // clearConsoleAndScrollbackBuffer()
      break;
    case "d":
      // console.log(leanedRight);
      userInput = TURN_RIGHT;
      // clearConsoleAndScrollbackBuffer()
      break;
    default:
      return;
  }
  if (course[0] + userInput != 0) {
    clearTimeout(timeoutId);
    clearConsoleAndScrollbackBuffer();
    // log(chalk.red(`                                                                    WRONG!`))
    // setTimeout( () => {
      // console.log("Ya got BUCKED, son!");
      userStatus = "Loser";
      // clearTimeout(timeoutId);
      // console.log('GameScore is: ' + gameScore)
      endgame(userStatus, gameScore, "wrong");
      return;


    // }, 1000)
    
    
    // console.log("Ya got BUCKED, son!");
    // userStatus = "Loser";
    // clearTimeout(timeoutId);
    // // console.log('GameScore is: ' + gameScore)
    // endgame(userStatus, gameScore);
    // return;
  }
  if (course.length === 1) {
    /// if we're at the last segment in the array
    clearTimeout(timeoutId);
    console.log(`\n\nYOU WIN!\n\n`);
    console.log(gameScore);
    userStatus = "Winner";
    endgame(userStatus, gameScore);
    return;
  } else {
    log(chalk.green(correct))
    gameScore += 10;
    console.log(`                                                               Score: ${gameScore}`);
    course.shift();
    resetTimer(course);
  }
}

export { theWholeGame, timeoutId };
