import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { userRouter } from "./routes/user.js";
import { menuRouter } from "./routes/menu.js";
import { orderRouter } from "./routes/order.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.json({mssg : "Welcome"})
})
app.use('/user',userRouter)
app.use('/menu',menuRouter)
app.use('/order',orderRouter)
// app.use('/auction',auctionRouter)