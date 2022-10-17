import express from "express";
const app = express();
const port = 3500;
app.use(express.json())
import {theWholeGame} from './game-backend.js'

// import {startGame, nextThing} from "./welcome.js"
let difficulties = ["Easy", "Medium", "Hard"];
let difficulty;
let userScore = 0;
// let course = [];

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
  return courseLength;
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
app.get("/playGame", (req, res) => {
  let courseLength = req.query.course;
  let returnVal;
if (courseLength == 1) {returnVal = "Winner"}
else {
  let x = Math.random();
  if (x>0.5) {returnVal = "1"}
   else {returnVal = "-1"}
}
console.log(returnVal)
  // res.send(returnVal)
})



app.listen(port, () => console.log(`Test Server listening on port ${port}!`));
