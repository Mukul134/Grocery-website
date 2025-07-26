import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative">
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full h-120 hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full h-120 object-cover md:hidden"
      />
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center px-4 pb-6 md:pb-0 md:pl-18 lg:pl-24">
        <h1 className="text-2xl text-gray-600 md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-[18rem] md:max-w-80 lg:max-w-105 leading-tight">
          Shop🛒 Smart💡, Eat🍴 Fresh🌿 - Powered by Grocery Bee 🐝
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 mt-10 font-medium">
          <Link
            to={"/products"}
            className="group flex items-center justify-center gap-2 px-6 md:px-7 py-3 bg-primary hover:bg-primary-dull transition rounded text-gray-600 cursor-pointer shadow-md w-full md:w-auto text-center"
          >
            Shop now
            <img
              className="md:hidden transition group-hover:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>
          <Link
            to={"/products"}
            className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer text-gray-600"
          >
            Explore deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
