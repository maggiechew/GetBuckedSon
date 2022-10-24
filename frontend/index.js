import fetch from "node-fetch";
import readlineSync from "readline-sync";
import { theWholeGame } from "./theGame.js";
import { chooseMenu, menuChoices} from "./menus.js";
import Audic from "audic";
import {loserImage, winnerImage, welcomeImage} from "./frontend-Objects.js"

let course;
let difficulties;

let index;

const slowBPM = new Audic("120bpm-16bars.mp3");

let userInfo = {
  name: "Guest",
  currentScore: 0
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
  console.log("New User Account Creation");
  console.log("Please enter your information here");
  let username = readlineSync.question(["Please enter your name: "]);
  let password = readlineSync.question(["Please enter your password: "]);

  let userToShare = {
    name: username,
    password: password,
    topScore: 0,
    totalScore: 0,
    currentScore: 0
  };
  let newUserResponse = await fetch("http://localhost:3500/newuser", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(userToShare),
  });
  userInfo = await newUserResponse.json();
  // console.log(userInfo)
  console.log(
    `Your name is: ${userInfo.name} and your password is: ${userInfo.password}`
  );
  setTimeout(() => {
    readlineSync
      .keyIn(
        'Press "M" to return to menu',
        { limit: "m" },
        { hideEchoback: true }
      )
      .toLowerCase();
    mainMenu();
  }, 1000);
}

async function chooseDifficulty() {
  let startResponse = await fetch("http://localhost:3500/start");
  difficulties = await startResponse.json();
  clearConsoleAndScrollbackBuffer();
  console.log("Choose your difficulty!");
  index = readlineSync.keyInSelect(difficulties);

  if (index === -1) {
    console.log("Returning to menu...");
    setTimeout(() => {
      mainMenu();
    }, 2000);
  }
  startingGame();
}

function logOutResetToGuest(){
  clearConsoleAndScrollbackBuffer();
  userInfo = {
    name: "Guest",
    currentScore: 0
  };
  console.log('You are now logged out!')
  console.log(`Name: ${userInfo.name}\nCurrentScore: ${userInfo.currentScore}`)
  setTimeout(() => {
    let selection = readlineSync
      .keyIn(
        'Press "M" to return to menu, or "Q" to quit the game.',
        { limit: ["m", "q" ]},
        { hideEchoback: true }
      ).toLowerCase();
      selection === "m"? mainMenu() : byeBye()
  }, 1000);
}

async function startingGame() {
  let courseResponse = await fetch(
    `http://localhost:3500/getCourse?index=${index}`
  );
  course = await courseResponse.json();
  playingGame(course);
}

async function playingGame(course) {
  console.log("Let's gooooo!");
  clearConsoleAndScrollbackBuffer();
  slowBPM.play();
  theWholeGame(course);
}

function scoreIfLoggedIn() {
  if (userInfo._id) {
    console.log("Your total score is: " + userInfo.totalScore);
    // console.log("Your top score is: " + userInfo.topScore);
  }
  console.log(`Your current score is: ${userInfo.currentScore}\n`)
}

async function endgame(result) {
  if (result === "Winner") { // if they're a winner

    console.log(winnerImage)
    +userInfo.currentScore++;
    console.log("Current score is: " + userInfo.currentScore);
    if (userInfo._id) { // if they're logged in
      // console.log("Verily I did get here");
      userInfo.totalScore += userInfo.currentScore;
      // if (userInfo.tota) {}
      let resultResponse = await fetch(`http://localhost:3500/winnerwinner`, {
        method: "PUT",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(userInfo),
      })
      userInfo = await resultResponse.json();

    
  console.log("Total score is: " + userInfo.totalScore)
  // console.log("Top score is: " + userInfo.topScore)
      ;
    }
  }
  if (result === "Loser") {
    console.log(loserImage);
    console.log("Current score is: " + userInfo.currentScore);
  }
  setTimeout(() => {
    let menuChoices = ["Play Again", "Change Difficulty", "Return to Menu"];
    console.log("What next? (Press 0 to quick-exit the game)");
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
  }, 1000);
}


function updatingUserInfo(newinfo) {
  userInfo = newinfo;
  userInfo.currentScore = 0;
}


export {
  course,
  userInfo,
  clearConsoleAndScrollbackBuffer,
  endgame,
  chooseDifficulty,
  newUser,
  byeBye,
  openingScreen,
  mainMenu,
  updatingUserInfo,
  logOutResetToGuest
};

openingScreen();
// startGame()
