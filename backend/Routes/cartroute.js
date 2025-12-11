import express from "express";
import {
  getCart,
  addCart,
  removeFromCart,
} from "../Controller/CartController.js";
import authProtect from "../Middlewears/authProtect.js";

const cartRouter = express.Router();

cartRouter.get("/get", authProtect, getCart);
cartRouter.post("/addToCart", authProtect, addCart);
cartRouter.post("/remove", authProtect, removeFromCart);

export default cartRouter;
