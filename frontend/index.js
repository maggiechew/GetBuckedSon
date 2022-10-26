import readlineSync from "readline-sync";
import { mainMenu } from "./menus.js";
import {} from "./game-functions.js";
import cfonts from "cfonts";
import * as align from "@topcli/text-align";
import chalk from "chalk";

const log = console.log;
let terminal = {
  columns: process.stdout.columns,
  rows: process.stdout.rows,
};

function clearConsoleAndScrollbackBuffer() {
  process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
  console.clear();
}

function byeBye() {
  clearConsoleAndScrollbackBuffer();
  cfonts.say(`\n\nBYE BYE!!!`, {
    font: "BLOCK", // define the font face
    align: "center", // define text alignment
    colors: ["#00FFFF"], // define all colors
  });
  cfonts.say(`\nsee you next time :)`, {
    font: "tiny", // define the font face
    align: "center", // define text alignment
    colors: ["#F1CF3B"], // define all colors
  });
  setTimeout(() => {
    clearConsoleAndScrollbackBuffer();
    process.exit(0);
  }, 1500);
}

async function openingScreen() {
  clearConsoleAndScrollbackBuffer();
  cfonts.say(`\n\nGET BUCKED, SON!`, {
    font: "BLOCK", // define the font face
    align: "center", // define text alignment
    colors: ["#FFBB33"], // define all colors
  });
  console.log("\n\n");
  log(chalk.green(align.center(`Press "S" to start`, terminal.columns)));
  log(
    chalk.blue(align.center(`Game best played full screen`, terminal.columns))
  );

  readlineSync.keyIn("", { limit: "s" }, { hideEchoback: true });
  mainMenu();
}

export { clearConsoleAndScrollbackBuffer, byeBye, openingScreen, terminal };

openingScreen();
