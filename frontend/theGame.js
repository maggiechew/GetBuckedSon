import readline from "node:readline";
import { Writable } from "node:stream";
import { clearConsoleAndScrollbackBuffer } from "./index.js";
import { endgame, course } from "./game-functions.js";
import { turningLeft, turningRight, leanedLeft, leanedRight, correct } from "./frontend-Objects.js";
import cfonts from "cfonts";
import * as align from "@topcli/text-align";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const log = console.log;
let timeoutId;
let userInput;
let value;
let userStatus;
let gameScore;





import Audic from "audic";
import { clear } from "node:console";
import { mainMenu } from "./menus.js";

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
  });
}

const TURN_LEFT = -1;
const TURN_RIGHT = 1;

function consoleResponse(course) {
  bpm.play();
  if (course[0] === TURN_RIGHT) {
    log(chalk.green(turningRight));
  } else if (course[0] === TURN_LEFT) {
    log(chalk.yellow(turningLeft));
  } else {
  clearTimeout(timeoutId);
  console.log('A devastating error has happened. Please hold......')
  setTimeout( () => {
    mainMenu()
  }, 1500)
  }
}

function resetTimer(course) {
  clearTimeout(timeoutId);

  consoleResponse(course);
  timeoutId = setTimeout(() => {
    clearConsoleAndScrollbackBuffer();
    userStatus = "Loser";
    endgame(userStatus, gameScore, "toolate");
  }, 1000);
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
      userInput = TURN_LEFT;
      break;
    case "d":
      userInput = TURN_RIGHT;
      break;
    default:
      return;
  }
  if (course[0] + userInput != 0) {
    clearTimeout(timeoutId);
    clearConsoleAndScrollbackBuffer();
      userStatus = "Loser";
      endgame(userStatus, gameScore, "wrong");
      return;
  }
  if (course.length === 1) {
    /// if we're at the last segment in the array
    clearTimeout(timeoutId);
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
