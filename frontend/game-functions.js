import fetch from "node-fetch";
import readlineSync from "readline-sync";
import { clearConsoleAndScrollbackBuffer } from "./index.js";
import { mainMenu, endgameMenu } from "./menus.js";
import { userInfo, loggedIn, updatingTotalScore, updatingHighScore, updatingUserInfo } from "./user-functions.js";
import {
  loserImage,
  winnerImage,
  winnerMessage,
  wrong,
  } from "./frontend-Objects.js";
import { theWholeGame } from "./theGame.js";
import cfonts from "cfonts";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const log = console.log;

let course;
let difficulties;
let index;

async function chooseDifficulty() {
  let startResponse = await fetch("http://localhost:3500/start");
  difficulties = await startResponse.json();
  clearConsoleAndScrollbackBuffer();

  cfonts.say(`Choose your difficulty!`, {
    font: "tiny", // define the font face
    align: "left", // define text alignment
    colors: ["#FFBB33"], // define all colors
  });

  if (!loggedIn) {
    log(
      chalk.blueBright(
        `               Remember, scores will only be saved if you're logged in!`
      )
    );
  }

  index = readlineSync.keyInSelect(difficulties);

  if (index === -1) {
    console.log("Returning to menu...");
    setTimeout(() => {
      mainMenu();
    }, 1000);
  } else {
    startingGame();
  }
}

async function startingGame() {
  let courseResponse = await fetch(
    `http://localhost:3500/getCourse?index=${index}`
  );
  course = await courseResponse.json();
  console.log("Please hold...");
  playingGame(course);
}

function playingGame(course) {
  clearConsoleAndScrollbackBuffer();
  theWholeGame(course);
}

async function endgame(result, gameScore, reason) {
  if (result === "Winner") {
    // if they're a winner
    let newHigh = false;
    clearConsoleAndScrollbackBuffer();
    chalkAnimation.rainbow(winnerMessage);
    setTimeout(async () => {
      log(chalk.yellow.bold(winnerImage));
      setTimeout(async () => {
        gameScore += 100;
        console.log(`\n---------------------------------------------------------------------------------------------------------------------------------------------------------------`)
        console.log(chalk.blueBright(`\n\nCongratulations! Your Score Is: `) + chalk.yellow(gameScore));
        if (loggedIn) {
          // if they're logged in
          updatingTotalScore(gameScore);
          if (+userInfo.highScore < gameScore) {
            newHigh = true;
            updatingHighScore(gameScore);
          }
          let resultResponse = await fetch(
            `http://localhost:3500/winnerwinner`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json;charset=utf-8" },
              body: JSON.stringify(userInfo),
            }
          );
          let data = await resultResponse.json();
          updatingUserInfo(data)
          console.log("Total score is: " + userInfo.totalScore);
          if (!newHigh) {
            console.log("High score is still: " + userInfo.highScore);
          }
          if (newHigh) {
            console.log(
              "NEW HIGH SCORE! High score is now: " + userInfo.highScore
            );
          }
        }
        setTimeout(() => {
          endgameMenu();
        }, 1000);
      }, 100);
    }, 3000);
  }
  if (result === "Loser") {
    if (reason === "wrong") {
      log(chalk.red(wrong));
    }
    if (reason === "toolate") {
        cfonts.say(`\nTOO LATE!`, {
            font: '3d',              // define the font face
            align: 'center',              // define text alignment
            colors: ["#0000FF"],         // define all colors
          });
    }
    setTimeout(() => {
      clearConsoleAndScrollbackBuffer();
      // console.log(loserImage);
      cfonts.say(`\nYA GOT BUCKED, SON!`, {
        font: 'BLOCK',              // define the font face
        align: 'center',              // define text alignment
        colors: ["#FFBB33"],         // define all colors
      });
      log(loserImage);
      console.log(`\n---------------------------------------------------------------------------------------------------------------------------------------------------------------`)

      console.log("\nToo bad! Your score was: " + chalk.red(gameScore));
    }, 1000);
    setTimeout(() => {
      endgameMenu();
    }, 1000);
  }
}

export { chooseDifficulty, startingGame, playingGame, endgame, course };
