import fetch from "node-fetch";
import readlineSync from "readline-sync";

import { clearConsoleAndScrollbackBuffer, byeBye } from "./index.js";
import { mainMenu } from "./menus.js";
import cfonts from "cfonts";
import chalk from "chalk";
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
  let username = readlineSync.question("");
  log(chalk.blueBright("Please enter your password: "));

  let password = readlineSync.question("", [{ hideEchoback: true }]);

  let attemptUserInfo = { name: username, password: password };
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
      log(
        chalk.blueBright(
          `Press "M" to return to the Main Menu, or "T" to Try Again`
        )
      );
      let menuChoice = readlineSync
        .keyIn("", { limit: ["m", "t"] }, { hideEchoback: true })
        .toLowerCase();

      if (menuChoice === "m") {
        mainMenu();
      }
      if (menuChoice === "t") {
        logIn();
      }
    }, 1000);
  } else {
    updatingUserInfo(loginAttempt);
    updatingLoggedIn();
    console.log("\nYou are now logged in as: " + chalk.yellow(userInfo.name));
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
  loggedIn = true;
  console.log(
    `\nSuccess! Your name is: ` +
      chalk.yellow(userInfo.name) +
      ` and your password is: ` +
      chalk.yellow(userInfo.password)
  );
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

function updatingTotalScore(gameScore) {
  userInfo.totalScore = +userInfo.totalScore + gameScore;
}

function updatingHighScore(gameScore) {
  userInfo.highScore = gameScore;
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
  updatingHighScore,
  updateGuestName,
  scoreIfLoggedIn,
  logIn,
  newUser,
  logOutResetToGuest,
  updatingUserInfo,
  updatingLoggedIn,
  updatingTotalScore,
  userInfo,
  loggedIn,
};
