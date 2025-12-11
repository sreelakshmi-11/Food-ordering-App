import express from "express";
import { signUp } from "../Controller/AuthController.js";
import { Login } from "../Controller/AuthController.js";
import multer from "../Middlewears/multer.js";

const userRouter = express.Router();

userRouter.post("/register", multer.single("image"), signUp);
userRouter.post("/login", Login);
export default userRouter;
