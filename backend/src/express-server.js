import {
  getDifficulties,
  setDifficulty,
  mongoScoreValidation,
} from "./server-functions.js";
import express from "express";
import { User } from "./user-model.js";
import userRouter from "./routes/userRouter.js";

const app = express();
const port = 3500;
app.use(express.json());
app.use("/user", userRouter);

app.get("/start", (req, res) => res.send(getDifficulties()));
app.get("/getCourse", (req, res) => {
  let difficultyIndex = req.query.index;
  res.send(setDifficulty(difficultyIndex));
});
app.put("/winnerwinner", async (req, res) => {
  let userInfo = req.body;
  userInfo = await mongoScoreValidation(userInfo);
  res.send(userInfo); 
});

// endpoint for creating new user
app.post("/newuser", async (req, res) => {
  let userObj = req.body;
  const userValid = await User.newUser(userObj);
  res.send(userValid);
});


app.listen(port, () => console.log(`Server listening on port ${port}!`));

export { };
