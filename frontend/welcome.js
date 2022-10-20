import fetch from "node-fetch";
import readlineSync from "readline-sync";
import { theWholeGame } from "./theGame.js";
let course;
let difficulties;
let guestInfo;
// import {giveResponse} from "./theGame.js"

function clearConsoleAndScrollbackBuffer() {
  process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
  console.clear();
}

function timeout (func, ms) {
  setTimeout(() => {
    func
  }, ms);
}

function byeBye() {
  console.log("okay, bye");
  process.exit(0);
}

async function beWelcomed() {
  clearConsoleAndScrollbackBuffer();
  console.log("Welcome to my game!"); // UPDATE: ASCII TEXT OF GAME NAME
  let guestInfoResponse = await fetch("http://localhost:3500/guestname");
  guestInfo = await guestInfoResponse.json();
  readlineSync
    .keyIn('Press "S" to start', { limit: "s" }, { hideEchoback: true })
    .toLowerCase();
  gameMenu();
}

async function showTutorial() {
  clearConsoleAndScrollbackBuffer();
  let tutorialResponse = await fetch("http://localhost:3500/tutorial");
  let tutorial = await tutorialResponse.text();
  console.log(tutorial);
  setTimeout(() => {
    readlineSync
      .keyIn(
        'Press "M" to return to menu',
        { limit: "m" },
        { hideEchoback: true }
      )
      .toLowerCase();
    gameMenu();
  }, 1000);
}

async function updateUsername() {
  let newUser = { Name: "" };
  clearConsoleAndScrollbackBuffer();
  newUser.Name = readlineSync.question("Please enter a new name: ");
  let updateUsernameResponse = await fetch(
    "http://localhost:3500/updateUserName",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(newUser),
    }
  );
  guestInfo = await updateUsernameResponse.json();
  console.log("Your new username is now: " + guestInfo.Name);
  // timeout(gameMenu(), 1000) // FIX ME
  gameMenu()
}

async function gameMenu() {
  clearConsoleAndScrollbackBuffer();
  console.log(`Welcome, ${guestInfo.Name}`);
  let menuResponse = await fetch("http://localhost:3500/menu");
  let menuChoices = await menuResponse.json();
  console.log("Please make a selection");
  let menu = readlineSync.keyInSelect(menuChoices);
  switch (menu) {
    case 0:
      startGame();
      break;
    case 1:
      showTutorial();
      break;
    case 2:
      updateUsername();
      break;
    case 3:
      byeBye();
      break;
    case -1:
      console.log("Returning to the menu...");
      setTimeout(() => {
        clearConsoleAndScrollbackBuffer();
        beWelcomed();
      }, 1000);
      break;
    default:
      console.log("Invalid input... please press a valid number!");
      menu();
      break;
  }
}
// need: start menu ( options include: update username, show tutorial, play a game... always shows your score)
// need: split startGame function into two different functions (or, remove first part entirely)

async function startGame() {
  console.log("YEEEEEHAWWWW! GIDDY UP, PARDNER!");
  chooseDifficulty();
}
async function chooseDifficulty() {
  let startResponse = await fetch("http://localhost:3500/start");
  difficulties = await startResponse.json();
  clearConsoleAndScrollbackBuffer();
  console.log("Choose your difficulty!");
  let index = readlineSync.keyInSelect(difficulties);
  let courseResponse = await fetch(
    `http://localhost:3500/getCourse?index=${index}`
  );
  course = await courseResponse.json();
  if (course.okay == "bye") {
    clearConsoleAndScrollbackBuffer();
    byeBye();
  }
  playingGame(course);
}

async function playingGame(course) {
  console.log("Let's gooooo!");
  clearConsoleAndScrollbackBuffer();
  theWholeGame(course);
}

async function endgame(result) {
  let resultResponse = await fetch(
    `http://localhost:3500/result?youarea=${result}`
  );
  let response = await resultResponse.text();

  setTimeout(() => {
    console.log(response);
    setTimeout(() => {
      console.log("sooooo.....");
      startGame();
    }, 1000);
  }, 1000);
}

export { course, endgame };

beWelcomed();
// startGame()
