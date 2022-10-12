//https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin
//https://stackoverflow.com/questions/67323405/javascript-readline-when-the-user-inputs-a-letter-i-want-to-exit-right-away-wit

import readline from "node:readline";
// import keypress from "keypress";
const ac = new AbortController();
const signal = ac.signal;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  // terminal: false,
});

// process.stdin.setRawMode(true);
// process.stdin.resume();

let courseSegments = [1, -1, 1, -1];
// rl.stdoutMuted = true;
// keypress(process.stdin);
let timeoutId;

function resetTimer(course) {
  if (course[0] > 0) {
    console.log("Turning Right!!");
  } else {
    console.log("Turning Left!!");
  }

  // timeoutId = setTimeout(() => {
  //   console.log("you lose");
  //   process.exit();
  // }, 2000);
}

let userInput;
let value;

process.stdin.on("keypress", function (ch, key) {
  console.log("yo");
  if (key && key.ctrl && key.name == "c") {
    process.stdin.pause();
  }
  value = key.sequence;
  // console.log(value)

  giveResponse(value);
  // process.stdin.pause();

  // console.log(value)
  // clearTimeout(timeoutId);

  // resetTimer();
});

function giveResponse(thekey) {
  console.log("Hi");

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
console.log(courseSegments)
  // console.log(value)
  if (courseSegments[0] + userInput != 0) {
    console.log(courseSegments[0]);
    return console.log("you lose!");
  }
  console.log(courseSegments.length);
  if (courseSegments.length == 0) {
    return console.log("you win!");
  } else {
    courseSegments.shift();

    resetTimer(courseSegments);
  }
  // process.exit()
}

resetTimer(courseSegments);

function asktheQuestion(input) {
  let userInput = 0;
  rl.question(
    input > 0 ? "Turning Right!!" : "Turning Left!!",
    { signal },
    (answer) => {
      // rl.question("Turning Right!!", { signal }, (answer) => {
      switch (answer) {
        case "a":
          console.log("LEFT");
          userInput = -1;
          break;
        case "d":
          console.log("RIGHT");
          userInput = 1;
          break;
      }
      process.exit();
    }
  );

  signal.addEventListener(
    "abort",
    () => {
      console.log("You lost!");
    },
    { once: true }
  );

  setTimeout(() => {
    ac.abort();
    process.exit();
  }, 5000); // 5 seconds
}

// asktheQuestion(1)

// rl.question('What is your favorite food? ', { signal }, (answer) => {
//   console.log(`Oh, so your favorite food is ${answer}`);
// });

// signal.addEventListener('abort', () => {
//   console.log('The food question timed out');
// }, { once: true });

// setTimeout(() => ac.abort(), 10000);
