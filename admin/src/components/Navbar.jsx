// Navbar.jsx
import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="flex px-[20px] py-4">
      <div className="w-full flex items-center justify-between">
        <img src={assets.logo} />

        <img src={assets.profile_image} className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default Navbar;
