import { loserImage, winnerImage, welcomeImage } from "./server-objects.js";
import {currentScore} from "./express-server.js"

let difficulties = ["Easy", "Medium", "Hard"];


function startGame() {
    return welcomeImage;
  }

  function getDifficulties() {
    return difficulties;
  }

  function setDifficulty(index) {
    if (index == -1) {
      return { okay: "bye" };
    }
    let course = [];
    let courseLength;
    if (difficulties[index] === "Easy") {
      courseLength = 10;
    } else if (difficulties[index] === "Medium") {
      courseLength = 20;
    } else if (difficulties[index] === "Hard") {
      courseLength = 50;
    }
    while (courseLength > 0) {
      let x = Math.random();
      if (x > 0.5) {
        course.push(1);
      } else {
        course.push(-1);
      }
      courseLength--;
    }
    return course;
  }


  function giveScore(result) {
    let image;
    if (result === "Loser") {
      image = loserImage;
    } else if (result === "Winner") {
      image = winnerImage;
    }
    return `${image}\n\nYour score is: ${currentScore}`;
  }

  export {startGame, getDifficulties, setDifficulty, giveScore}