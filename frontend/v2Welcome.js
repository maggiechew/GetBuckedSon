import fetch from "node-fetch";
import readlineSync from "readline-sync";
import { theWholeGame } from "./theGame.js";
let courseLength;

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
    courseLength = await courseResponse.json();
    if (courseLength.okay == "bye") {
      console.log("okay, bye");
      process.exit(0);
    }
    // console.log("the course length is: " + courseLength)
    console.log("now we play our game")
    playingGame(courseLength);
  } else {
    console.log("okay, bye");
    process.exit(0);
  }
}

async function playingGame(thecourseLength) {
  console.log("we're playing a game!");
  let moveResponse = await fetch(`http://localhost:3500/playGame?course=${thecourseLength}`)
  // let moveBody = await response.text();
  // let move = moveBody.value
  
  // console.log(moveBody)
  // result == "Winner" ? console.log("You win!") : console.log("You lose");
  // let resultResponse = await fetch(
  //   `http://localhost:3500/result?youarea=${result}`
  // );
  // let response = await resultResponse.text();
  // console.log(response);
}

export { courseLength as course };
beWelcomed();
// startGame()
