import React from "react";
import { assets } from "../assets/assets/assets";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";

const FoodItem = ({ item }) => {
  const { AddToCart, handleDelete, cartItems } = useContext(StoreContext);
  return (
    <div className="shadow-[0px_0px_10px_#00000040] rounded-xl transition-all duration-300 ease-in-out hover:scale-95 relative">
      <img
        src={item.image}
        className="rounded-xl object-cover h-[200px] w-full"
      />
      <div className="absolute top-4 right-4">
        {!cartItems[item._id] ? (
          <p
            className="flex w-[100px] bg-white text-[tomato] items-center justify-center px-3 py-2 rounded-2xl"
            onClick={() => {
              AddToCart(item._id);
            }}
          >
            Add
          </p>
        ) : (
          <div className="flex gap-[10px] bg-white items-center justify-center px-3 py-2 rounded-2xl">
            <img
              src={assets.remove_icon_red}
              onClick={() => handleDelete(item._id)}
            />
            <p>{cartItems[item._id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={() => AddToCart(item._id)}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col p-6">
        <div className="flex justify-between mb-[10px]">
          <p className="text-[20px] font-medium">{item.name}</p>
        </div>
        <p className="text-[12px] text-[#676767]">{item.description}</p>
        <p className="text-[tomato] font-medium text-[22px] my-[10px]">
          ₹{item.price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
