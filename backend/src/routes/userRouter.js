// router for user requests

import express from "express";
// import { userInfo } from "../express-server.js";
import { User } from "../mongo-stuff.js";
// import {
//   startGame,
//   getDifficulties,
//   setDifficulty,
//   mongoScoreValidation,
// } from "../server-functions.js";

const userRouter = express.Router();

// userRouter.get("/getinfo", (req, res) => res.send(userInfo));
userRouter.post("/logIn", async (req, res) => {
  let userName = req.body.name;
  let userPassword = req.body.password;
  try {
    const userValid = await User.findByLogin(userName, userPassword);
    // userInfo = userValid
    res.status(200).send(userValid);
    // return userInfo = userValid
  } catch (error) {
    res.status(404).send({error: error.message});
  }
});
userRouter.put("/updateGuestName", (req, res) => {
    userInfo.name = req.body.name;
    res.send(userInfo);
  });

export default userRouter;
