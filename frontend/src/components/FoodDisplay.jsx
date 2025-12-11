import React from "react";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({ category }) => {
  const { food } = useContext(StoreContext);
  return (
    <div className="flex flex-col gap-[20px]">
      <p className="text-[30px] font-medium">Top dishes near you</p>
      <div className="grid grid-cols-4 gap-[25px]">
        {food.map((item) => {
          if (category === "All" || item.category === category)
            return <FoodItem key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
