import fetch from "node-fetch";
import readlineSync from "readline-sync";
import { clearConsoleAndScrollbackBuffer, terminal } from "./index.js";
import { menuChoices, mainMenu, endgameMenu } from "./menus.js";
import { userInfo, loggedIn } from "./user-functions.js";
import {
  loserImage,
  winnerImage,
  wrong,
  } from "./frontend-Objects.js";
import { theWholeGame } from "./theGame.js";
import cfonts from "cfonts";
import * as align from "@topcli/text-align";
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
          userInfo.totalScore = +userInfo.totalScore + gameScore;
          if (+userInfo.highScore < gameScore) {
            newHigh = true;
            userInfo.highScore = gameScore;
          }
          let resultResponse = await fetch(
            `http://localhost:3500/winnerwinner`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json;charset=utf-8" },
              body: JSON.stringify(userInfo),
            }
          );
          userInfo = await resultResponse.json();
          //   userInfo.currentScore = 0; TODO: does this mess anything up?

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
    // console.log("Score is: " + gameScore);
    if (reason === "wrong") {
      log(chalk.red(wrong));
    }
    if (reason === "toolate") {
        cfonts.say(`\nTOO LATE!`, {
            font: '3d',              // define the font face
            align: 'center',              // define text alignment
            colors: ["#0000FF"],         // define all colors
          });
    //   log(chalk.blue(tooLate));
    }
    setTimeout(() => {
      clearConsoleAndScrollbackBuffer();
      // console.log(loserImage);
      cfonts.say(`\nYA GOT BUCKED, SON!`, {
        font: 'BLOCK',              // define the font face
        align: 'center',              // define text alignment
        colors: ["#FFBB33"],         // define all colors
      });
    //   log(chalk.yellow(gotBuckedMessage));
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
