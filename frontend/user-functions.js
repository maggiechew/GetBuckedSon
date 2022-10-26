import fetch from "node-fetch";
import readlineSync from "readline-sync";

import { clearConsoleAndScrollbackBuffer, byeBye } from "./index.js";
import { menuChoices, mainMenu } from "./menus.js";
import cfonts from "cfonts";
import * as align from "@topcli/text-align";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const log = console.log;

let loggedIn = false;

let userInfo = {
  name: "Guest",
  currentScore: 0,
};

async function updateGuestName() {
  clearConsoleAndScrollbackBuffer();

  cfonts.say(`NEW GUEST NAME`, {
    font: "tiny", // define the font face
    align: "left", // define text alignment
    colors: ["#FFBB33"], // define all colors
  });
  log(chalk.blueBright("Please enter a new Guest name: "));
  userInfo.name = readlineSync.question("");
  console.log("\nYour new guest name is: " + chalk.yellow(userInfo.name));
  console.log("To permanently save your name and stats, please log in.\n");
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

function scoreIfLoggedIn() {
  if (loggedIn) {
    console.log(`Your total score is: ${userInfo.totalScore}`);
    console.log(`Your high score is: ${userInfo.highScore}\n`);
  }
}

async function logIn() {
  clearConsoleAndScrollbackBuffer();
  cfonts.say(`LOG INTO EXISTING ACCOUNT`, {
    font: "tiny", // define the font face
    align: "left", // define text alignment
    colors: ["#FFBB33"], // define all colors
  });
  log(chalk.blueBright("Please enter your saved name: "));
//   console.log("Log into your existing account\n-------------------\n");
  // console.log("Please enter your information here");
  let username = readlineSync.question("");
  log(chalk.blueBright("Please enter your password: "));

  let password = readlineSync.question("", [
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
    console.log("\nYou are now logged in as: " + chalk.yellow(userInfo.name));
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
        '\nPress "M" to return to menu',
        { limit: "m" },
        { hideEchoback: true }
      )
      .toLowerCase();
    mainMenu();
  }, 1000);
}

async function newUser() {
  clearConsoleAndScrollbackBuffer();
  cfonts.say(`New User Account Creation`, {
    font: "tiny", // define the font face
    align: "left", // define text alignment
    colors: ["#FFBB33"], // define all colors
  });
//   console.log("New User Account Creation\n");
  // console.log("Please enter your information here");
  log(chalk.blueBright("Please enter your new name: "));
  let username = readlineSync.question([""]);
  log(chalk.blueBright("Please enter your new password: "));
  let password = readlineSync.question([""]);

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
    `\nYour name is: `+ chalk.yellow(userInfo.name) + ` and your password is: `+ chalk.yellow(userInfo.password));
  // console.log('I got here')
  setTimeout(() => {
    let choice = readlineSync.keyIn(
      '\nPress "M" to return to Menu',
      { limit: "m" },
      { hideEchoback: true }
    );

    if (choice === "m") {
      mainMenu();
    }
  }, 1000);
}

function logOutResetToGuest() {
  clearConsoleAndScrollbackBuffer();
  userInfo = {
    name: "Guest",
    currentScore: 0,
  };
  loggedIn = false;
  cfonts.say(`You are now logged out!`, {
    font: "tiny", // define the font face
    align: "left", // define text alignment
    colors: ["#FFBB33"], // define all colors
  });
//   console.log("You are now logged out!\n");
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
  updateGuestName,
  scoreIfLoggedIn,
  logIn,
  newUser,
  logOutResetToGuest,
  updatingUserInfo,
  updatingLoggedIn,
  userInfo,
  loggedIn,
};
