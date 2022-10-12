import readlineSync from "readline-sync";
let CourseSegments = [1, -1, 1, -1];

// right is +1, left is -1

function testing(course) {
  for (let i = 0; i < course.length; i++) {
    // setTimeout(() => {
    let userInput = readlineSync.keyIn(
      course[i] > 0 ? "Turning Right!!" : "Turning Left!!",
      { hideEchoBack:true }
    );
    
        if (!userInput) return "you lose!"
    
    
    switch (userInput) {
      case "a":
        console.log("LEFT");
        userInput = -1;
        break;
      case "d":
        console.log("RIGHT");
        userInput = 1;
        break;
    }
    if (course[i] + userInput != 0) {
      return "you lose!";
    }
  }
  return "you win!";
}

console.log(testing(CourseSegments));
