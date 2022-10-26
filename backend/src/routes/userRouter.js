// router for user requests
import express from "express";
import { User } from "../user-model.js";

const userRouter = express.Router();

userRouter.post("/logIn", async (req, res) => {
  let userName = req.body.name;
  let userPassword = req.body.password;
  try {
    const userValid = await User.findByLogin(userName, userPassword);
    res.status(200).send(userValid);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});
userRouter.put("/updateGuestName", (req, res) => {
  userInfo.name = req.body.name;
  res.send(userInfo);
});

export default userRouter;
