import readline from "readline";
import readlineSync from "readline-sync"

let outcome;
let CourseSegments = ["right", "left", "right", "left"];


// let userResponse = "left"

// function game() {}

function decisionTime() {
    for (let i = 0; i < CourseSegments.length; i++) {
    console.log(`The computer chose.... ${CourseSegments[i]}`);
    
    let userInput = readlineSync.keyIn("What do you choose? ");
    console.log(`User Input is: ${userInput} `)
    userInput = wasdToCorrect(userInput);
    console.log(`From WASD it is: ${userInput}`)

    switch (userInput) {
      case "left":
        switch (CourseSegments[i]) {
          case "right":
            outcome = "WINNER";
            console.log(outcome);
            break;
          default:
            outcome = "LOSER";
            console.log(outcome);
            break;
        }
        break;
      case "right":
        switch (CourseSegments[i]) {
          case "left":
            outcome = "WINNER";
            console.log(outcome);
            break;
          case "right":
            outcome = "LOSER";
            console.log(outcome);
            break;
        }
    }
    if (outcome == "LOSER") {
      console.log("You lost!");
      return "You Lost!";
    }
  }
  console.log("You win!");
  return "You win!";
}

function wasdToCorrect (input) {
  console.log(input)
  // if (input = "w") {
  //   return 
  // }
  if (input = "a") {
    return "left"
  }
  // if (input = "s") {
  //   return 
  // }
  if (input = "d") {
    return "right"
  }
}

let possibleOutcomes = ["Fail", "Continue"];

function didUserFail(choice) {
  switch (choice) {
    case "right":
      switch (CourseSegments) {
        case "left":
          outcome = possibleOutcomes[1];
          break;
        case "right":
          outcome = possibleOutcomes[0];
          break;
        case "n/a":
          outcome = possibleOutcomes[0];
          break;
      }
      break;
    case "left":
      switch (CourseSegments) {
        case "right":
          outcome = possibleOutcomes[1];
          console.log(outcome);
          break;
        case "left":
          outcome = possibleOutcomes[0];
          break;
        case "n/a":
          outcome = possibleOutcomes[0];
          break;
      }
      break;
    case "straight":
      switch (CourseSegments) {
        case "a":
          outcome = possibleOutcomes[1];
          break;
        case "right":
          outcome = possibleOutcomes[0];
          break;
        case "left":
          outcome = possibleOutcomes[0];
          break;
      }
      break;
  }
  if (outcome == "Fail") {
    console.log("Failed!");
    return "failed";
  }
}

decisionTime();



