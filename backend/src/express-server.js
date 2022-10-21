import {startGame, getDifficulties, setDifficulty, giveScore} from "./server-functions.js"
import {tutorial, menu, userInfo} from "./server-objects.js"
import express from "express";

const app = express();
const port = 3500;
app.use(express.json());

app.get("/", (req, res) => res.send(startGame()));
app.get("/guestname", (req, res) => res.send(userInfo));
app.get("/start", (req, res) => res.send(getDifficulties()));
app.get("/mainMenu", (req, res) => res.send(menu));
app.get("/tutorial", (req, res) => res.send(tutorial));
app.put("/updateUserName", (req, res) => {
  userInfo = req.body;
  res.send(userInfo);
});
app.get("/getCourse", (req, res) => {
  let difficultyIndex = req.query.index;
  res.send(setDifficulty(difficultyIndex));
});
app.get("/result", (req, res) => {
  let result = req.query.youarea;
  if (result == "Winner") {
    userInfo.Score ++;
  }  res.send(giveScore(result));
});

app.listen(port, () =>
  console.log(`Original server listening on port ${port}!`)
);

export {userInfo} 