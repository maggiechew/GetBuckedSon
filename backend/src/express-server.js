import {startGame, getDifficulties, setDifficulty, giveScore} from "./server-functions.js"
import {tutorial, guestMenu, userMenu} from "./server-objects.js"
import express from "express";
import {User} from "./mongo-stuff.js"

let userInfo = {
  name: "Guest",
};

let currentScore = 0;

const app = express();
const port = 3500;
app.use(express.json());

app.get("/", (req, res) => res.send(startGame()));
app.get("/guestname", (req, res) => res.send(userInfo));
app.get("/start", (req, res) => res.send(getDifficulties()));
app.get("/mainMenu", (req, res) => {
  let type = req.query.type;
  if (type === "user") {res.send(userMenu)}
  else if (type === "guest") {res.send(guestMenu)}});
app.get("/tutorial", (req, res) => res.send(tutorial));
app.put("/updateUserName", (req, res) => {
  userInfo.Name = req.body.Name;
  res.send(userInfo);
});
app.get("/getCourse", (req, res) => {
  let difficultyIndex = req.query.index;
  res.send(setDifficulty(difficultyIndex));
});
app.get("/result", async (req, res) => {
  let result = req.query.youarea;
  if (result == "Winner") {
    +currentScore ++;
    await mongoScoreValidation();
    // +userInfo.Score ++; // TODO: function to update in Mongo!!    
  }  res.send(giveScore(result));
});

async function mongoScoreValidation() {
  let user = await User.findById(userInfo._id)
  if (currentScore > user.topScore) {
    user.topScore = currentScore;
  }
  user.totalScore += currentScore;
  await user.save();
}

// endpoint for creating new user
app.post("/newuser", async (req, res) => {
  let userName = req.body.name;
  let userPassword = req.body.password;
  const userValid = await User.newUser({name: userName, password: userPassword, topScore: 0, totalScore: 0});
  // console.log(userValid)
  userInfo = userValid;
  // console.log(userInfo)
  res.send(userValid)
})

//TODO: add log-in functionality for guest
//TODO: add log-out functionality for user


app.listen(port, () =>
  console.log(`Server listening on port ${port}!`)
);

export {userInfo, currentScore} 