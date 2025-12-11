import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const Add = () => {
  const BackendURL = "https://food-backend-ra6e.onrender.com";
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);

    const response = await axios.post(`${BackendURL}/food/addItem`, formData);
    if (response.data.success) {
      setImageFile("");
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      toast.success("Item Added Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex flex-col gap-4 p-[80px] w-[500px] ">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Add Food Items</h1>
        <div className="flex flex-col gap-3">
          <label htmlFor="upload">
            <span>Upload Image</span>
            <img
              src={imagePreview || assets.upload_area}
              alt="upload"
              className="w-[100px]"
            />
          </label>
          <input
            type="file"
            accept="image/*"
            id="upload"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImagePreview(URL.createObjectURL(file));
                setImageFile(file);
              }
            }}
            className="hidden"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Name"
            className="px-3 py-2 border focus:outline-none border-gray-300 rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Description</label>
          <textarea
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Enter Name"
            className="px-3 py-2 border focus:outline-none border-gray-300 rounded-xl h-[100px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Category</label>
          <select
            value={category}
            className="px-3 py-2 border focus:outline-none border-gray-300 rounded-xl"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Salad</option>
            <option>Rolls</option>
            <option>Desserts</option>
            <option>Sandwich</option>
            <option>Cake</option>
            <option>pure veg</option>
            <option>Pasta</option>
            <option>Noodles</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            className="px-3 py-2 border focus:outline-none border-gray-300 rounded-xl"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[tomato] text-white py-2 rounded-xl"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
