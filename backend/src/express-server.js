import {
  getDifficulties,
  setDifficulty,
  mongoScoreValidation,
} from "./server-functions.js";
// import { tutorial, guestMenu, userMenu } from "./server-objects.js";
import express from "express";
import { User } from "./mongo-stuff.js";
import userRouter from "./routes/userRouter.js";

const app = express();
const port = 3500;
app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res) => res.send(startGame()));
app.get("/guestname", (req, res) => res.send(userInfo));
app.get("/start", (req, res) => res.send(getDifficulties()));
app.get("/mainMenu", (req, res) => { // TODO: delete?
  let type = req.query.type;
  if (type === "user") {
    res.send(userMenu);
  } else if (type === "guest") {
    res.send(guestMenu);
  }
});
app.get("/tutorial", (req, res) => res.send({ message: tutorial })); // TODO: delete?

app.get("/getCourse", (req, res) => {
  let difficultyIndex = req.query.index;
  res.send(setDifficulty(difficultyIndex));
});
app.put("/winnerwinner", async (req, res) => {
  let userInfo = req.body;
  userInfo = await mongoScoreValidation(userInfo);
  res.send(userInfo); 
});

app.get("/");

// endpoint for creating new user
app.post("/newuser", async (req, res) => {
  let userObj = req.body;
  const userValid = await User.newUser(userObj);
  // console.log(userValid)
  // userInfo = userValid;
  // console.log(userInfo)
  res.send(userValid);
});


app.listen(port, () => console.log(`Server listening on port ${port}!`));

export { };
