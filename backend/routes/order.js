import express from "express";
import { createOrder, getOrders, getOrderbyId, getCurrentOrders } from "../controllers/order.js";
export const orderRouter = express.Router();

orderRouter.post('/create',createOrder)
orderRouter.get('/get/:id',getOrders)
orderRouter.get('/:id',getOrderbyId)
orderRouter.post('/currentOrders',getCurrentOrders)