import readline from "node:readline";
import {Writable} from 'node:stream';

// const ac = new AbortController();
// const signal = ac.signal;

let mutableStdout = new Writable({
  write: function(chunk, encoding, callback) {
    if (!this.muted)
      process.stdout.write(chunk, encoding);
    callback();
  }
});

mutableStdout.muted = true;
readline.createInterface({
  input: process.stdin,
  output: mutableStdout,
  terminal: true
});

let courseSegments = [1, -1, 1, -1, 1, -1, 1, -1];
let timeoutId;

function consoleResponse(course) {
  if (course[0] > 0) {
    console.log("Turning Right!!");
  } else {
    console.log("Turning Left!!");
  }
}

function resetTimer(course) {
  clearTimeout(timeoutId);
  consoleResponse(course);

  timeoutId = setTimeout(() => {
    console.log("you lose");
    process.exit();
  }, 2000);
}

let userInput;
let value;

process.stdin.on("keypress", function (ch, key) {
  if (key && key.ctrl && key.name == "c") {
    process.stdin.pause();
  }
  value = key.sequence;
  giveResponse(value);
});

function giveResponse(thekey) {
  switch (value) {
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
  if (courseSegments[0] + userInput != 0) {
    // console.log(courseSegments[0]);
    console.log("you lose!");
    process.exit();
  }
  // console.log(courseSegments.length);
  if (courseSegments.length == 1) {
    console.log("you win!");
    process.exit();
  } else {
    courseSegments.shift();

    resetTimer(courseSegments);
  }
  // process.exit()
}

function letsStart(){
resetTimer(courseSegments);
}


letsStart()