import express from "express";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../Controller/OrderController.js";
import authProtect from "../Middlewears/authProtect.js";

const orderRouter = express.Router();

orderRouter.post("/place", authProtect, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/orders", authProtect, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/update/:id", updateStatus);

export default orderRouter;
