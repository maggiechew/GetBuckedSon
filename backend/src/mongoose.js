import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { user: process.env.MONGO_USER, pass: process.env.MONGO_PASS }) // TODO: does this work?
export default mongoose;
