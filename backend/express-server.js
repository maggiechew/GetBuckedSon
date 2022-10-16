import express from "express";
const app = express();
const port = 3500;

// import {startGame, nextThing} from "./welcome.js"
let difficulties = ["Easy", "Medium", "Hard"];
let difficulty;
let userScore = 0;
let course = [];

function startGame() {
  return "Welcome";
}
function getDifficulties() {
  return difficulties;
}

function setDifficulty(index) {
  if (index == -1) {
    return { okay: "bye" };
  }
  difficulty = difficulties[index];
  let courseLength;
  if (difficulty === "Easy") {
    courseLength = 10;
  } else if (difficulty === "Medium") {
    courseLength = 20;
  } else if (difficulty === "Hard") {
    courseLength = 50;
  }

  while (courseLength > 0) {
    let x = Math.random();
    if (x > 0.5) {course.push(1);}
    else {course.push(-1)}
    courseLength--;
  }
//   while (courseLength > 0) {
//     let x = Math.random();
//     if (x > 0.75) course.push(1);
//     else if (x >= 0.5) course.push(2);
//     else if (x > 0.25) course.push(-1);
//     else course.push(-2);
//     courseLength--;
//   }
  return course;
}

function giveScore() {
    
  return `Your score is: ${userScore}`;
}


app.get("/", (req, res) => res.send(startGame()));
app.get("/start", (req, res) => res.send(getDifficulties()));
app.get("/getCourse", (req, res) => {
  let difficultyIndex = req.query.index;

  res.send(setDifficulty(difficultyIndex));
});
app.get("/result", (req, res) => {
  let result = req.query.youarea;
  if (result == "Winner") {
    userScore++}
    
    res.send(giveScore());
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
