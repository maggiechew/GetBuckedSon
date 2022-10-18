import readline from "node:readline";
import { Writable } from "node:stream";
import { endgame } from "./welcome.js";
// import { makeRandom } from "./random-events.js";
import { course } from "./welcome.js";
// let course = [-1, 1, 1, -1, -1];
let timeoutId;
let userInput;
let value;
let userStatus;

// let testWholeGame;

let mutableStdout = new Writable({
  write: function (chunk, encoding, callback) {
    if (!this.muted) process.stdout.write(chunk, encoding);
    callback();
  },
});

mutableStdout.muted = true;

function theWholeGame(course) {
  // testWholeGame++;
  // console.log("theWholeGame function has run " + testWholeGame + " times");
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

function consoleResponse(course) {
  if (course[0] == 1) {
    console.log("Turning Right!!");
  } else if (course[0] == -1) {
    console.log("Turning Left!!");
  } else {
    console.log("Error!!!!");
  }
}

function resetTimer(course) {
  clearTimeout(timeoutId);
  consoleResponse(course);
  // console.log("Timeout ID is now: " + timeoutId);
  timeoutId = setTimeout(() => {
    console.log("TOO LATE!");
    userStatus = "Loser";
    // console.log("Timeout ID is now: " + timeoutId);
    // testWholeGame++;

    endgame(userStatus);
  }, 2000);
}

process.stdin.on("keypress", function (ch, key) {
  if (key && key.ctrl && key.name == "c") {
    process.stdin.pause();
  }
  value = key.sequence;
  giveResponse(value);
});

function giveResponse(thekey) {
  switch (thekey) {
    case "a":
      console.log("LEFT");
      userInput = -1;
      break;
    case "d":
      console.log("RIGHT");
      userInput = 1;
      break;
    default:
      return;
  }
  if (course[0] + userInput != 0) {
    // console.log(course[0]);
    console.log("Ya got BUCKED, son!");
    userStatus = "Loser";
    // console.log("Timeout ID is: " + timeoutId);
    clearTimeout(timeoutId)
    // console.log("Cleared Timeout ID is: " + timeoutId);
    // testWholeGame++;
    endgame(userStatus);
    return;
    // console.log('your score is: '+ userScore)
  }
  // console.log(course.length);
  if (course.length == 1) {
    // userScore++
    console.log("you win!");
    // console.log("Timeout ID is: " + timeoutId);

    clearTimeout(timeoutId)
    userStatus = "Winner";
    // console.log("my userStatus is: " + userStatus);
    // testWholeGame++;
    endgame(userStatus);
    return;
  } else {
    course.shift();
    // userScore++

    resetTimer(course);
  }
  // process.exit()
}

// function letsStart(){
// resetTimer(course);
// }
export { theWholeGame, timeoutId };
