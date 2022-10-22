import fetch from "node-fetch";
import readlineSync from "readline-sync";
import { theWholeGame } from "./theGame.js";
let course;
let difficulties;
let userInfo;
let index;

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
  let welcomeResponse = await fetch("http://localhost:3500/");
  let welcome = await welcomeResponse.text();
  console.log(welcome);
  let userInfoResponse = await fetch("http://localhost:3500/guestname");
  userInfo = await userInfoResponse.json();
  // console.log(userInfo)
  readlineSync
    .keyIn('Press "S" to start', { limit: "s" }, { hideEchoback: true })
    .toLowerCase();
  chooseMenu();
}

function chooseMenu() {
  if (!userInfo._id) {
    guestMenu();
  } else loggedInMenu();
}

async function loggedInMenu() {
  clearConsoleAndScrollbackBuffer();
  // console.log(userInfo);
  console.log(`Welcome, ${userInfo.name}`);
  let menuResponse = await fetch("http://localhost:3500/mainMenu?type=user");
  let menuChoices = await menuResponse.json();
  console.log("Please make a selection");
  let menu = readlineSync.keyInSelect(menuChoices);
  switch (menu) {
    case 0:
      console.log("YEEEEEHAWWWW! GIDDY UP, PARDNER!");
      chooseDifficulty();
      break;
    case 1:
      showTutorial();
      break;
    case 2:
      updateGuestName();/// TODO: new function for updating existing user name (patch?)
      break;
    case 3:
      newUser(); /// TODO: function to reset userInfo to default values
      break;
    case 4:
      byeBye();
      break;
    case -1:
      console.log("Returning to the menu...");
      setTimeout(() => {
        clearConsoleAndScrollbackBuffer();
        openingScreen();
      }, 1000);
      break;
    default:
      console.log("Invalid input... please press a valid number!");
      menu();
      break;
  }
}

async function guestMenu() {
  clearConsoleAndScrollbackBuffer();
  // console.log(userInfo);
  console.log(`Welcome, ${userInfo.name}`);
  let menuResponse = await fetch("http://localhost:3500/mainMenu?type=guest");
  let menuChoices = await menuResponse.json();
  console.log("Please make a selection");
  let menu = readlineSync.keyInSelect(menuChoices);
  switch (menu) {
    case 0:
      console.log("YEEEEEHAWWWW! GIDDY UP, PARDNER!");
      chooseDifficulty();
      break;
    case 1:
      showTutorial();
      break;
    case 2:
      updateGuestName();
      break;
    case 3:
      newUser();
      break;
    case 4:
      byeBye();
      break;
    case -1:
      console.log("Returning to the menu...");
      setTimeout(() => {
        clearConsoleAndScrollbackBuffer();
        openingScreen();
      }, 1000);
      break;
    default:
      console.log("Invalid input... please press a valid number!");
      menu();
      break;
  }
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
    chooseMenu();
  }, 1000);
}

async function updateGuestName() {
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
  userInfo = await updateUsernameResponse.json();
  console.log("Your new username is now: " + userInfo.Name);
  setTimeout(() => {
    readlineSync
      .keyIn(
        'Press "M" to return to menu',
        { limit: "m" },
        { hideEchoback: true }
      )
      .toLowerCase();
    chooseMenu();
  }, 1000);
}

async function newUser() {
  clearConsoleAndScrollbackBuffer();
  console.log("New User Account Creation");
  console.log("Please enter your information here");
  let username = readlineSync.question(["Please enter your name: "]);
  let password = readlineSync.questionNewPassword();

  let userToShare = { name: username, password: password };
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
    chooseMenu();
  }, 1000);
}

// need: start menu ( always shows your score)
// 60bpm: https://freesound.org/people/digifishmusic/sounds/49112/
//https://www.imusic-school.com/en/tools/online-metronome/

async function chooseDifficulty() {
  let startResponse = await fetch("http://localhost:3500/start");
  difficulties = await startResponse.json();
  clearConsoleAndScrollbackBuffer();
  console.log("Choose your difficulty!");
  index = readlineSync.keyInSelect(difficulties);

  if (index === -1) {
    byeBye();
  }
  startingGame();
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
  theWholeGame(course);
}

async function endgame(result) {
  let resultResponse = await fetch(
    `http://localhost:3500/result?youarea=${result}`
  );
  let response = await resultResponse.text();
  console.log(response);

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
        chooseMenu();
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

export { course, endgame };

openingScreen();
// startGame()
