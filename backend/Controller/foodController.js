import Food from "../Model/foodModel.js";
import { uploadFoodImage } from "../utils/uploadToCloudinary.js";
import foodModel from "../Model/foodModel.js";

export const AddFoodItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    const fileBuffer = req.file.buffer;
    const imageUploadResult = await uploadFoodImage(fileBuffer, "FoodItems");

    const imageUrl = imageUploadResult.secure_url;
    const publicId = imageUploadResult.public_id;
    const { name, price, category, description } = req.body;

    if (!name || !price || !category || !description) {
      return res.json({
        message: "All fields are required",
        success: false,
      });
    }
    const food = await Food.create({
      name,
      image: imageUrl,
      public_id: publicId,
      price,
      category,
      description,
    });
    res.status(201).json({
      success: true,
      message: "FoodItem created successfully",
      food,
    });
  } catch (err) {
    console.log(err);
  }
};

//get foodItems
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove food item

export const removeFood = async (req, res) => {
  try {
    const id = req.params.id;

    const food = await foodModel.findById(id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    if (food.public_id) {
      await cloudinary.uploader.destroy(food.public_id);
    }

    await foodModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Food Item removed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
