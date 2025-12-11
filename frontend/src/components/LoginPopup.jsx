import React from "react";
import { useState, useEffect } from "react";
import { assets } from "../assets/assets/assets";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const LoginPopup = () => {
  const { setShowLogin } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("signUp");
  const { url, setToken } = useContext(StoreContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onLogin = async (formData) => {
    try {
      const response = await axios.post(`${url}/user/login`, formData);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Logged in successfully");
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSignup = async (formData) => {
    try {
      const response = await axios.post(`${url}/user/register`, formData);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Signed in successfully");
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reset();
  }, [currentState]);
  return (
    <div className="flex fixed inset-0 bg-black/50 justify-center items-center z-50 ">
      <div className="flex flex-col gap-[20px] p-10 bg-white w-[400px] rounded-xl ">
        <div className="flex justify-between items-center">
          <h2 className="text-[24px] items-start font-medium">
            {currentState === "signUp" ? "Sign Up" : "Login"}
          </h2>
          <img
            src={assets.cross_icon}
            className="flex w-4 h-4 items-center justify-center"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <form
          onSubmit={handleSubmit(
            currentState === "signUp" ? onSignup : onLogin
          )}
          className="flex flex-col gap-[10px] "
        >
          {currentState === "signUp" && (
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-xl p-2 w-full"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
          )}

          <input
            type="text"
            placeholder="Your Email"
            className="border border-gray-300 rounded-xl p-2"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
          <input
            type="password"
            placeholder="Your password"
            className="border border-gray-300 rounded-xl p-2"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
          <button className="bg-[tomato] rounded-xl p-2 text-white">
            {currentState === "signUp" ? "Sign Up" : "Login"}
          </button>
          {currentState === "signUp" && (
            <div className="flex gap-[10px] items-start">
              <input
                type="checkbox"
                className="mt-1"
                {...register("terms", { required: true })}
              />

              <p className="text-gray-500 text-[12px] flex items-start">
                By continuing, you agree to Terms of Service and Privacy Policy
              </p>
            </div>
          )}
          {errors.terms && currentState === "signUp" && (
            <p className="text-red-500 text-sm">You must accept terms</p>
          )}
          <div className="text-gray-500 text-[16px]">
            {currentState === "signUp" ? (
              <div>
                Already have an account?{" "}
                <span
                  type="submit"
                  className="text-[tomato]"
                  onClick={() => setCurrentState("Login")}
                >
                  Login
                </span>
              </div>
            ) : (
              <div className="flex gap-[10px]">
                Create a new Account
                <span
                  className="text-[tomato]"
                  onClick={() => setCurrentState("signUp")}
                >
                  Signup
                </span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
