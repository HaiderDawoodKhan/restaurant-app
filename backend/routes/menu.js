import express from "express";
import { getAllMenus, createMenuItem } from "../controllers/menu.js";

export const menuRouter = express.Router();

menuRouter.post('/getAll',getAllMenus)
menuRouter.post('/create', createMenuItem)