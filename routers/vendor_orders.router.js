import express from "express";
import { addToOrders, getOrdersData } from "../controllers/vendor_orders.controller";

const venodorOrdersRouter = express.Router();

venodorOrdersRouter.post('/add-vendor-order', addToOrders)
venodorOrdersRouter.get('/get-vendor-order', getOrdersData)

export default venodorOrdersRouter