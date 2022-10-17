import readline from "node:readline";
import { Writable } from "node:stream";
// import { makeRandom } from "./random-events.js";
// import { course } from "./welcome.js";
let course = [-1, 1, 1, -1, -1];
let timeoutId;
let userInput;
let value;
let userStatus;

let mutableStdout = new Writable({
  write: function (chunk, encoding, callback) {
    if (!this.muted) process.stdout.write(chunk, encoding);
    callback();
  },
});

mutableStdout.muted = true;
readline.createInterface({
  input: process.stdin,
  output: mutableStdout,
  terminal: true,
});

function theWholeGame(course) {
  resetTimer(course);
  process.on("exit", function (code) {
    if (code !== 0) {
      return "Loser";
    } else return "Winner";
  });
}
export { theWholeGame };

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

  timeoutId = setTimeout(() => {
    console.log("TOO LATE!");

    process.exit(1);
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
  switch (
    thekey //SHOULD THIS BE THEKEY
  ) {
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
    process.exit(1);

    // console.log('your score is: '+ userScore)
  }
  // console.log(course.length);
  if (course.length == 1) {
    // userScore++
    console.log("you win!");
    // clearTimeout(timeoutId)
    userStatus = "Winner";
    console.log("my userStatus is: " + userStatus);
    // return "Winner"
    // console.log('your score is: '+ userScore)
    process.exit();
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
