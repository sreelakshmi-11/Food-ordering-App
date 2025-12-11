import React from "react";
import { menu_list } from "../assets/assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-[20px] " id="explore-menu">
      <h1 className="text-[30px] font-medium">Explore our menu</h1>
      <p className="w-[60%]">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="flex gap-[40px] overflow-x-scroll p-[10px]">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-[10px]"
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
          >
            <img
              src={item.menu_image}
              className={
                category === item.menu_name
                  ? "outline-4 outline-[tomato] rounded-full p-[2px]"
                  : ""
              }
            />
            <p className="flex items-center justify-center text-[gray] text-[20px]">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      <hr className="w-[100%] h-[2px] bg-[#e2e2e2] border-none" />
    </div>
  );
};

export default ExploreMenu;
