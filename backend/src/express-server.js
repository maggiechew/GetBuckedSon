import express from "express";
import { loserImage, winnerImage, tutorial } from "./server-objects.js";
const app = express();
const port = 3500;
app.use(express.json())

// import {startGame, nextThing} from "./welcome.js"
let difficulties = ["Easy", "Medium", "Hard"];
let difficulty;
let userScore = 0;
let course = [];
let menu = ["Let's Play!", "Tutorial", "Update Username", "Exit Game"]
let guestInfo = {
  Name: "Guest"};

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
  course = []
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
  return course;
}

function giveScore(result) {
  let image;  
  if (result === "Loser") {
      image = loserImage;
    } else if (result === "Winner") {
      image = winnerImage;
    }
  return `${image}\n\nYour score is: ${userScore}`;
}


app.get("/", (req, res) => res.send(startGame()));
app.get("/guestname", (req, res) => res.send(guestInfo));
app.get("/start", (req, res) => res.send(getDifficulties()));
app.get("/menu", (req, res) => res.send(menu))
app.get("/tutorial", (req, res) => res.send(tutorial))
app.put("/updateUserName", (req, res) => {
  guestInfo = req.body;
  res.send(guestInfo)
})


app.get("/getCourse", (req, res) => {
  let difficultyIndex = req.query.index;

  res.send(setDifficulty(difficultyIndex));
});
app.get("/result", (req, res) => {
  let result = req.query.youarea;
  if (result == "Winner") {
    userScore++}
    
    res.send(giveScore(result));
  }
);

app.listen(port, () => console.log(`Original server listening on port ${port}!`));
