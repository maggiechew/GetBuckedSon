import readline from "node:readline";
import {Writable} from 'node:stream';
import {makeRandom} from './random-events.js'

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
let userScore = 0;
let courseLength = 10;
let courseSegments = makeRandom(courseLength)
let timeoutId;



// consoleResponse(course)

// resetTimer(thing)
//  logKeys() 

//   giveResponse



function consoleResponse(course) {
    if (course[0] == 1) {
    console.log("Turning Right!!");
  } else {
    console.log("Turning Left!!");
}}

function resetTimer(course) {
  clearTimeout(timeoutId);
  consoleResponse(course);

  timeoutId = setTimeout(() => {
    console.log("TOO LATE!");
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
  switch (thekey) { //SHOULD THIS BE THEKEY
    case "a":
      console.log("LEFT");
      userInput = -1;
      break;
    case "d":
      console.log("RIGHT");
      userInput = 1;
      break;
    case "w":
      console.log("UP!");
      userInput = 2;
      break;
    case "s":
      console.log("Holding on!");
      userInput = -2;
      break;
    default:
      return;
  }
  if (courseSegments[0] + userInput != 0) {
    // console.log(courseSegments[0]);
    console.log("Ya got BUCKED, son!");
    console.log('your score is: '+ userScore)
    process.exit();
  }
  // console.log(courseSegments.length);
  if (courseSegments.length == 1) {
    userScore++
    console.log("you win!");
    console.log('your score is: '+ userScore)
    process.exit();
  } else {
    courseSegments.shift();
    userScore++

    resetTimer(courseSegments);
  }
  // process.exit()
}

function letsStart(){
resetTimer(courseSegments);
}


letsStart()
