import fetch from "node-fetch";
import readlineSync from "readline-sync";
import { theWholeGame } from "./theGame.js";
import { menuChoices } from "./menus.js";
import Audic from "audic";
import { loserImage, winnerImage, welcomeImage, wrong, tooLate, gotBuckedMessage, winnerMessage } from "./frontend-Objects.js";

import chalk from 'chalk';
const log = console.log;
// import { startBar } from "./progressBar.js";

let course;
let difficulties;
let index;
let loggedIn = false;

const slowBPM = new Audic("120bpm-16bars.mp3");

let userInfo = {
  name: "Guest",
  currentScore: 0,
};
// let currentScore = 0;

function clearConsoleAndScrollbackBuffer() {
  process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
  console.clear();
}

function timeout(func, ms) {
  setTimeout(() => {
    func;
  }, ms);
}

function byeBye() {
  console.log("okay, bye");
  process.exit(0);
}

async function openingScreen() {
  clearConsoleAndScrollbackBuffer();
  console.log(welcomeImage);
  readlineSync
    .keyIn('Press "S" to start', { limit: "s" }, { hideEchoback: true })
    .toLowerCase();
  mainMenu();
}

function mainMenu() {
  clearConsoleAndScrollbackBuffer();
  console.log(`Welcome, ${userInfo.name}\n`);
  scoreIfLoggedIn();
  // console.log("\n")
  menuChoices();
}

async function newUser() {
  clearConsoleAndScrollbackBuffer();
  console.log("New User Account Creation\n");
  // console.log("Please enter your information here");
  let username = readlineSync.question(["Please enter your name: "]);
  let password = readlineSync.question(["Please enter your password: "]);

  let userToShare = {
    name: username,
    password: password,
    highScore: 0,
    totalScore: 0,
    // currentScore: 0
  };
  let newUserResponse = await fetch("http://localhost:3500/newuser", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(userToShare),
  });
  userInfo = await newUserResponse.json();
  // console.log(userInfo)
  loggedIn = true;
  console.log(
    `Your name is: ${userInfo.name} and your password is: ${userInfo.password}`
  );
  // console.log('I got here')
  setTimeout(() => {
    let choice = readlineSync
      .keyIn(
        'Press "M" to return to Menu',
        { limit: "m" },
        { hideEchoback: true }
      )
    
    if (choice === "m") {
      mainMenu();
    }
  }, 1000);
}

async function chooseDifficulty() {
  let startResponse = await fetch("http://localhost:3500/start");
  difficulties = await startResponse.json();
  clearConsoleAndScrollbackBuffer();
  console.log("Choose your difficulty!");
  if (!loggedIn) {
    console.log(`Remember, scores will only be saved if you're logged in!`);
  }
  index = readlineSync.keyInSelect(difficulties);

  if (index === -1) {
    console.log("Returning to menu...");
    setTimeout(() => {
      mainMenu();
    }, 2000);
  }
  startingGame();
}

function logOutResetToGuest() {
  clearConsoleAndScrollbackBuffer();
  userInfo = {
    name: "Guest",
    currentScore: 0,
  };
  loggedIn = false;
  console.log("You are now logged out!\n");
  // console.log(
  //   `Name: ${userInfo.name}\n`
  // );
  setTimeout(() => {
    let selection = readlineSync
      .keyIn(
        'Press "M" to return to menu, or "Q" to quit the game.',
        { limit: ["m", "q"] },
        { hideEchoback: true }
      )
      .toLowerCase();
    selection === "m" ? mainMenu() : byeBye();
  }, 1000);
}

async function startingGame() {
  let courseResponse = await fetch(
    `http://localhost:3500/getCourse?index=${index}`
  );
  course = await courseResponse.json();
  console.log("Please hold...");
  // startBar();
  // setTimeout(() => {
  playingGame(course);
  // }, 4000);
}

function playingGame(course) {
  // console.log("Let's gooooo!");
  clearConsoleAndScrollbackBuffer();
  // slowBPM.play();
  // startBar();
  // setTimeout( () => {
  // clearConsoleAndScrollbackBuffer();

  theWholeGame(course);
  // }, 4000)
  // theWholeGame(course);
}

function scoreIfLoggedIn() {
  if (loggedIn) {
    console.log(`Your total score is: ${userInfo.totalScore}`);
    console.log(`Your high score is: ${userInfo.highScore}\n`);
  }
}

async function endgame(result, gameScore, reason) {
  if (result === "Winner") {
    // if they're a winner
    let newHigh = false;
    log(chalk.blueBright(winnerMessage))
    log(chalk.magenta(winnerImage));
    gameScore += 100;
    console.log("Score is: " + gameScore);
    if (loggedIn) {
      // if they're logged in
      userInfo.totalScore = +userInfo.totalScore + gameScore;
      if (+userInfo.highScore < gameScore) {
        newHigh = true;
        userInfo.highScore = gameScore;
      }
      let resultResponse = await fetch(`http://localhost:3500/winnerwinner`, {
        method: "PUT",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(userInfo),
      });
      userInfo = await resultResponse.json();
      userInfo.currentScore = 0;

      console.log("Total score is: " + userInfo.totalScore);
      if (!newHigh) {
        console.log("High score is still: " + userInfo.highScore);
      }
      if (newHigh) {
        console.log("NEW HIGH SCORE! High score is now: " + userInfo.highScore);
      }
    }
    setTimeout(() => {
      endgameMenu();
  },1000)
  }
  if (result === "Loser") {
    // console.log("Score is: " + gameScore);
if (reason === "wrong"){

log(chalk.red(wrong))}
if (reason === "toolate") {
  log(chalk.blue(tooLate))
}
setTimeout( () => {
  clearConsoleAndScrollbackBuffer();
  // console.log(loserImage);
  log(chalk.yellow(gotBuckedMessage))
  log(chalk.gray(loserImage));
  console.log("\nToo bad! Your score was: " + gameScore);
}, 1000);
  setTimeout(() => {
    endgameMenu();
},1000)
  }

}

function endgameMenu () {
  let menuChoices = ["Play Again", "Change Difficulty", "Return to Menu"];
  console.log("\nWhat next? (Press 0 to quick-exit the game)");
  let menu = readlineSync.keyInSelect(menuChoices);
  switch (menu) {
    case 0:
      startingGame();
      break;
    case 1:
      chooseDifficulty();
      break;
    case 2:
      mainMenu();
      break;
    case -1:
      byeBye();
      break;
    default:
      console.log("Invalid input... please press a valid number!");
      menu();
      break;
  }
}

function updatingUserInfo(newinfo) {
  userInfo = newinfo;
  userInfo.currentScore = 0;
}

function updatingLoggedIn() {
  if (loggedIn) {
    loggedIn = false;
  }
  if (!loggedIn) {
    loggedIn = true;
  }
}

export {
  course,
  userInfo,
  loggedIn,
  clearConsoleAndScrollbackBuffer,
  endgame,
  chooseDifficulty,
  newUser,
  byeBye,
  openingScreen,
  mainMenu,
  updatingUserInfo,
  logOutResetToGuest,
  updatingLoggedIn,
};

openingScreen();
// startGame()
