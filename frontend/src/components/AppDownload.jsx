import React from "react";
import { assets } from "../assets/assets/assets";

const AppDownload = () => {
  return (
    <div className="flex flex-col mx-auto" id="app-download">
      <p className="text-[40px] flex items-center text-center py-[20px] mx-auto">
        For Better Experience Download <br /> Swiggy App
      </p>
      <div className="flex items-center justify-center">
        <img src={assets.play_store} />
        <img src={assets.app_store} />
      </div>
    </div>
  );
};

export default AppDownload;
