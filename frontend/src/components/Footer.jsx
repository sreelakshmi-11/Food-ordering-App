import React from "react";
import { assets } from "../assets/assets/assets";

const Footer = () => {
  return (
    <div
      className="mt-[50px] bg-[#333333] px-[100px] pt-[60px] flex flex-col gap-[20px]  bottom-0 left-0"
      id="contact-us"
    >
      <div className="flex">
        <div className="flex flex-col gap-[20px] w-[40%] ">
          <img src={assets.logo} className="w-50" />
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            adipisci tenetur velit, nam voluptatem cupiditate mollitia quia
            eveniet expedita debitis eum sunt necessitatibus consectetur
            perspiciatis at, perferendis qui aliquid repellat?
          </p>
          <div className="flex gap-[20px]">
            <img src={assets.facebook_icon} />
            <img src={assets.twitter_icon} />
            <img src={assets.linkedin_icon} />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[30%] items-center">
          <h2 className="text-[24px] text-white">COMPANY</h2>
          <ul className="text-gray-300">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-white w-[30%] items-center">
          <h2 className="text-[24px]">GET IN TOUCH</h2>
          <p className="text-gray-300">+91 0000000000</p>
          <p className="text-gray-300">swiggy@contact.com</p>
        </div>
      </div>
      <hr className="border-t-2 border-gray-400" />
      <p className="flex  justify-center text-gray-300 pb-[20px]">
        Copyright2024@swiggy.com -All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
