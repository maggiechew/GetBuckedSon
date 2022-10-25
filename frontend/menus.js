import { userInfo, clearConsoleAndScrollbackBuffer, logOutResetToGuest, loggedIn, updatingLoggedIn } from "./index.js";
import fetch from "node-fetch";
import readlineSync from "readline-sync";
import {
  chooseDifficulty,
  newUser,
  byeBye,
  openingScreen,
  mainMenu,
  updatingUserInfo,
} from "./index.js";
import { menu, tutorial } from "./frontend-Objects.js";

//chooseDifficulty, showTutorial, updateGuestName, newUser, byebye, openingscreen

// function chooseMenu() {
//   if (!userInfo._id) {
//     guestMenu();
//   } else loggedInMenu();
// }

function userMenu() {
  clearConsoleAndScrollbackBuffer();
  if (!loggedIn) {
    let menu = ["Update your guest name", "Log In", "Create New Account"];
    console.log(
      "Please make your selection. Press 0 to return to the previous menu."
    );
    let theMenu = readlineSync.keyInSelect(menu);
    switch (theMenu) {
      case 0:
        console.log(
          `Please enter your new guest name!\nTo permanently assign yourself a name, please log in.`
        );
        updateGuestName();
        break;
      case 1:
        logIn();
        break;
      case 2:
        newUser();
        break;
      case -1:
        console.log("Returning to previous menu...");
        setTimeout(() => {
          clearConsoleAndScrollbackBuffer();
          mainMenu();
        }, 1000);
    }
  }
  if (loggedIn) {
    let menu = ["Log Out"];
    console.log(
      "Please make your selection. Press 0 to return to the previous menu."
    );

    let theMenu = readlineSync.keyInSelect(menu);
    switch (theMenu) {
      case 0:
        logOutResetToGuest();
        break;
      case -1:
        console.log("Returning to previous menu...");
        setTimeout(() => {
          clearConsoleAndScrollbackBuffer();
          mainMenu();
        }, 1000);
    }
  }
}

function menuChoices() {
  console.log("Please make a selection");
  let theMenu = readlineSync.keyInSelect(menu);
  switch (theMenu) {
    case 0:
      console.log("YEEEEEHAWWWW! GIDDY UP, PARDNER!");
      chooseDifficulty();
      break;
    case 1:
      showTutorial();
      break;
    case 2:
      userMenu();
      break;
    case 3:
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
      chooseMenu();
      break;
  }
}

async function updateGuestName() {
  clearConsoleAndScrollbackBuffer();
  userInfo.name = readlineSync.question("Please enter a new Guest name: ");
  console.log("Your new guest name is: " + userInfo.name);
  console.log("To permanently save your name and stats, please log in.");
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

async function logIn() {
  clearConsoleAndScrollbackBuffer();
  console.log("Log into your existing account\n-------------------\n");
  // console.log("Please enter your information here");
  let username = readlineSync.question("Please enter your saved name: ");
  let password = readlineSync.question("Please enter your password: ", [
    { hideEchoback: true },
  ]);

  let attemptUserInfo = { name: username, password: password };
  // console.log(attemptUserInfo)
  let loginAttemptResponse = await fetch("http://localhost:3500/user/logIn", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(attemptUserInfo),
  });

  let loginAttempt = await loginAttemptResponse.json();

  if (loginAttemptResponse.status !== 200) {
    console.log(loginAttempt.error);
    console.log(`\nYour name is still: ${userInfo.name}\n`);
    setTimeout(() => {
      let menuChoice = readlineSync
        .keyIn(
          'Press "U" to return to user menu, or "T" to try again',
          { limit: ["u", "t"] },
          { hideEchoback: true }
        )
        .toLowerCase();

      if (menuChoice === "u") {
        mainMenu();
      }
      if (menuChoice === "t") {
        logIn();
      }
    }, 1000);
  } else {
    // console.log(loginAttempt);
    updatingUserInfo(loginAttempt);
    // console.log(userInfo);
    updatingLoggedIn();
    console.log("\nYou are now logged in as: " + userInfo.name);
    // !userInfo.password
    // ? ""
    // : console.log(`Your password is: ${userInfo.password}`);
    !userInfo.highScore
      ? ""
      : console.log(`\nYour high score is: ${userInfo.highScore}`);
    !userInfo.totalScore
      ? ""
      : console.log(`Your total score is: ${userInfo.totalScore}\n`);
  }

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

async function showTutorial() {
  clearConsoleAndScrollbackBuffer();

  console.log(tutorial);
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

export { menuChoices };
