// import { welcomeImage } from "./server-objects.js";
import { User } from "./mongo-stuff.js";

let difficulties = ["Easy", "Medium", "Hard"];

// function startGame() {
//   return welcomeImage;
// }

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

async function mongoScoreValidation(userInfo) {
  // console.log("I got here");
  let user = await User.findById(userInfo._id);
  user.name = userInfo.name;
  user.password = userInfo.password;
  user.highScore = userInfo.highScore;
user.totalScore = userInfo.totalScore;
// user.currentScore = userInfo.currentScore;
console.log(user)
  return await user.save();
}

export { getDifficulties, setDifficulty, mongoScoreValidation };
