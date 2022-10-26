import readlineSync from "readline-sync";
import { startingGame, chooseDifficulty } from "./game-functions.js";
import { clearConsoleAndScrollbackBuffer, byeBye } from "./index.js";
import {
  menu,
  turningLeft,
  turningRight,
  credits,
} from "./frontend-Objects.js";
import {
  updateGuestName,
  newUser,
  logIn,
  scoreIfLoggedIn,
  userInfo,
  loggedIn,
  logOutResetToGuest,
} from "./user-functions.js";

import cfonts from "cfonts";
import * as align from "@topcli/text-align";
import chalk from "chalk";
const log = console.log;

let terminal = {
  columns: process.stdout.columns,
  rows: process.stdout.rows,
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
console.retro = async (string) => {
  let letters = string.split("");
  for (let i = 0; i < letters.length; i++) {
    process.stdout.write(letters[i]);
    await wait(10);
  }
};

function mainMenu() {
  clearConsoleAndScrollbackBuffer();
  cfonts.say(`Welcome, ${userInfo.name}`, {
    font: "tiny", // define the font face
    align: "left", // define text alignment
    colors: ["#FFBB33"], // define all colors
  });
  scoreIfLoggedIn();
  menuChoices();
}

function menuChoices() {
  log(chalk.blueBright(`Please make a selection.\nPress '0' to Exit.`));
  let theMenu = readlineSync.keyInSelect(menu);
  switch (theMenu) {
    case 0:
      chooseDifficulty();
      break;
    case 1:
      showTutorial();
      break;
    case 2:
      userMenu();
      break;
    case 3:
      credits();
      break;
    case -1:
      byeBye();
      break;
    default:
      console.log("Invalid input... please press a valid number!");
      mainMenu();
      break;
  }
}

function userMenu() {
  clearConsoleAndScrollbackBuffer();
  let menu;
  cfonts.say(`USER MENU`, {
    font: "tiny", // define the font face
    align: "left", // define text alignment
    colors: ["#FFBB33"], // define all colors
  });
  log(
    chalk.blueBright(
      "Please make your selection.\nPress 0 to return to the previous menu."
    )
  );
  if (!loggedIn) {
    menu = ["Update your guest name", "Log In", "Create New Account"];
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
        break;
    }
  }
  if (loggedIn) {
    menu = ["Log Out"];
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
        break;
    }
  }
}

async function showTutorial() {
  clearConsoleAndScrollbackBuffer();
  log(chalk.blue.bold(align.left(`\nAre you ready to....`, terminal.columns)));
  cfonts.say(`GET BUCKED, SON?`, {
    font: "tiny", // define the font face
    align: "left", // define text alignment
    colors: ["#FFBB33"], // define all colors
  });

  await console.retro(
    "Welcome to my game! Your mission- should you choose to accept it- is to " +
      chalk.red("STAY ON YOUR DONKEY!\n\n")
  );

  await console.retro("That ornery ol' donkey will do his best to throw you off by veering one way, then another; by holding on and leaning into turns, you will " + chalk.cyan('STAY PUT!\n'))
  await console.retro("\nWhen your donkey leans left...\n");
  log(chalk.yellow(turningLeft));

  setTimeout(async () => {
    await console.retro(
      `\n...you need to lean ` +
        chalk.green(`RIGHT!`) +
        `\nWhen your donkey leans right...\n`
    );
    log(chalk.green(turningRight));

    setTimeout(async () => {
      await console.retro(
        `\n...you need to lean ` +
          chalk.yellow(`LEFT!`) +
          `
    
To lean left, press ` +
          chalk.yellow("A") +
          `... to lean right, press ` +
          chalk.green("D") +
          `!

If you press the wrong key, or don't press it in time, you'll get BUCKED!
  
Guests can play as much as they want... but Users increase their total score every time they play!
Users can also keep track of their highest score EVER!

To create your own user account- or access one you've already created- choose "User Menu" in the Main Menu.\n\n`
      );

      setTimeout(() => {
log(chalk.blueBright('Press "M" to return to menu'))
        readlineSync
          .keyIn(
            '',
            { limit: "m" },
            { hideEchoback: true }
          )
          .toLowerCase();
        mainMenu();
      }, 1000);
    }, 1000);
  }, 1000);
}

function endgameMenu() {
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

export { mainMenu, menuChoices, userMenu, endgameMenu, showTutorial };