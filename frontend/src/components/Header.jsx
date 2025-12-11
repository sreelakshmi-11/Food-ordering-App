import React from "react";

const Header = () => {
  return (
    <div className="bg-[url('/header_img.png')] bg-no-repeat bg-contain h-[500px] w-full relative mt-[40px]">
      <div className="absolute flex flex-col gap-[20px] max-w-[50%] bottom-[7%] left-[100px] animate-[fadeIn_3s_ease-in-out]">
        <h2 className="font-medium text-[70px] text-white leading-[80px]">
          Order your favourite food here
        </h2>
        <p className="text-white">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button className="border-none text-[#747474] font-medium py-[12px] px-[20px] bg-white rounded-[50px] w-[150px]">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
