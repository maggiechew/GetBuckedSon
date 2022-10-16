import fetch from "node-fetch";
import readlineSync from "readline-sync";
import { theWholeGame } from "./theGame.js";
let course;

async function beWelcomed() {
  // let response = await fetch("http://localhost:3500/");
  // let welcome = await response.text();
  console.log("Welcome to my game!");
  startGame();
}

async function startGame() {
  if (readlineSync.keyInYN("Would you like to play a game?")) {
    let response = await fetch("http://localhost:3500/start");
    let difficulties = await response.json();
    console.log("Choose your difficulty!");
    let index = readlineSync.keyInSelect(
      difficulties,
      "Which difficulty do you want?"
    );
    let courseResponse = await fetch(
      `http://localhost:3500/getCourse?index=${index}`
    );
    course = await courseResponse.json();
    if (course.okay == "bye") {
      console.log("okay, bye");
      process.exit(0);
    }
    playingGame(course);
  } else {
    console.log("okay, bye");
    process.exit(0);
  }
}

async function playingGame(course) {
  console.log("we're playing a game!");
  let result = theWholeGame(course)
  result == "Winner" ? console.log("You win!") : console.log("You lose");
  let resultResponse = await fetch(
    `http://localhost:3500/result?youarea=${result}`
  );
  let response = await resultResponse.text();
  console.log(response);
}

export { course };
beWelcomed();
// startGame()
