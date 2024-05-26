import express from "express";
import { createUser,loginUser, changePassword, getUserInfo } from "../controllers/user.js";

export const userRouter = express.Router();

userRouter.post('/create',createUser)
userRouter.post('/login',loginUser)
userRouter.post('/changepassword',changePassword)
userRouter.get('/info/:id',getUserInfo)