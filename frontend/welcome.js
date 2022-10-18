import fetch from "node-fetch";
import readlineSync from "readline-sync";
import { timeoutId, theWholeGame } from "./theGame.js";
let course;
// import {giveResponse} from "./theGame.js"

async function beWelcomed() {
  console.log("Welcome to my game!");
  startGame();
}

async function startGame() {
  // timeoutId = undefined;
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
    // console.log("the course is:" + course)
    if (course.okay == "bye") {
      console.log("okay, bye");
      process.exit(0);
    }
    console.log("now we play our game");
    playingGame(course);
  } else {
    console.log("okay, bye");
    process.exit(0);
  }
}

async function playingGame(course) {
  console.log("we're playing a game!");
  theWholeGame(course);
}

async function endgame(result) {
  console.log("the result is: " + result);
  result == "Winner" ? console.log("You win!") : console.log("You lose");
  let resultResponse = await fetch(
    `http://localhost:3500/result?youarea=${result}`
  );
  let response = await resultResponse.text();
  console.log(response);
  setTimeout(() => {
    console.log("sooooo.....");
  }, 500);
  setTimeout(() => {
    startGame();
  }, 1000);
}

export { course, endgame };

beWelcomed();
// startGame()
