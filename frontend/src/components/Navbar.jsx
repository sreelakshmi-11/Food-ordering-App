import React, { useState } from "react";
import { assets } from "../assets/assets/assets";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };
  return (
    <div className="flex justify-between py-[20px] items-center font-outfit">
      <Link to="/">
        <img
          src="https://ik.imagekit.io/kwposnf6mvi/wp-content/uploads/2019/09/Swiggy-logo.jpg"
          alt=""
          className="w-15 h-15"
        />
      </Link>
      <ul className="flex justify-between gap-[20px] text-[20px] text-[#49557e]">
        <Link
          to="/"
          className={` ${menu === "home" ? "border-b-2 border-[#49557e]" : ""}`}
          onClick={() => setMenu("home")}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          className={` active:border-b ${
            menu === "menu" ? "border-b-2 border-[#49557e]" : ""
          }`}
          onClick={() => setMenu("menu")}
        >
          menu
        </a>
        <a
          href="#app-download"
          className={`active:border-b ${
            menu === "mobile-app" ? "border-b-2 border-[#49557e]" : ""
          }`}
          onClick={() => setMenu("mobile-app")}
        >
          mobile-app
        </a>
        <a
          href="#contact-us"
          className={`active:border-b ${
            menu === "contact-us" ? "border-b-2 border-[#49557e]" : ""
          }`}
          onClick={() => setMenu("contact-us")}
        >
          contact-us
        </a>
      </ul>
      <div className="flex gap-[30px] items-center">
        <img src={assets.search_icon} alt="search" className="w-6 h-6" />
        <div className="relative">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket" className="w-6 h-6" />
          </Link>
          {getTotalCartAmount() > 0 && (
            <div className="absolute w-2 h-2 bg-[tomato] rounded-full top-[-6px] right-0"></div>
          )}
        </div>
        {!token ? (
          <button
            className="py-[10px] rounded-3xl border border-[gray] px-7 whitespace-nowrap text-[#49557e] hover:bg-[#fff4f2] transition duration-300 ease-in-out"
            onClick={() => setShowLogin(true)}
          >
            Sign in
          </button>
        ) : (
          <details className="relative ">
            <summary style={{ listStyle: "none" }}>
              <img src={assets.profile_icon} />
            </summary>
            <ul className="flex flex-col gap-[10px] absolute right-0 top-10 bg-[#fff4f2] p-[10px] w-[120px] z-10">
              <li className="flex gap-[10px]">
                <img src={assets.bag_icon} />
                <p
                  onClick={() => navigate("/myorders")}
                  className="hover:text-[tomato]"
                >
                  Orders
                </p>
              </li>
              <hr />
              <li className="flex gap-[10px]">
                <img src={assets.logout_icon} />
                <p onClick={logout} className="hover:text-[tomato]">
                  Logout
                </p>
              </li>
            </ul>
          </details>
        )}
      </div>
    </div>
  );
};

export default Navbar;
