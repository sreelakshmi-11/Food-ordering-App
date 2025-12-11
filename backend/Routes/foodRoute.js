import { AddFoodItem, removeFood } from "../Controller/foodController.js";
import express from "express";
import upload from "../Middlewears/multer.js";
import { listFood } from "../Controller/foodController.js";

const foodRouter = express.Router();

foodRouter.post("/addItem", upload.single("image"), AddFoodItem);
foodRouter.get("/listFood", listFood);
foodRouter.delete("/removeFood/:id", removeFood);

export default foodRouter;
