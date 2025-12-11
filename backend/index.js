import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoute.js";
import cors from "cors";
import foodRouter from "./Routes/foodRoute.js";
import cartRouter from "./Routes/cartroute.js";
import orderRouter from "./Routes/orderRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const mongoUri = process.env.MONGOURI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port 8000");
    });
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("connection failed", err);
  });
