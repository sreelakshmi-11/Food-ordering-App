import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food, cartItems, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food.map((item) => {
      console.log(item);
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 50,
    };
    let response = await axios.post(`${url}/order/place`, orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.error(response.data.message);
      console.log(response.data.message);
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  });
  return (
    <form onSubmit={placeOrder} className="grid grid-cols-2 mt-[100px]">
      <div className="flex flex-col gap-[20px] w-[450px]">
        <div className="text-[30px] font-medium mb-[20px]">
          Delivery Information
        </div>
        <div className="flex gap-[10px] ">
          <input
            required
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="FirstName"
            className="border border-gray-300 rounded-xl p-2 w-full"
          />
          <input
            required
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="LastName"
            className="border border-gray-300 rounded-xl p-2 w-full"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email address"
          className="border border-gray-300 rounded-xl p-2 w-full"
        />
        <input
          required
          type="text"
          placeholder="Street"
          name="address"
          onChange={onChangeHandler}
          value={data.address}
          className="border border-gray-300 rounded-xl p-2"
        />
        <div className="flex gap-[10px] ">
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            className="border border-gray-300 rounded-xl p-2 w-full"
          />
          <input
            required
            type="text"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            className="border border-gray-300 rounded-xl p-2 w-full"
          />
        </div>
        <div className="flex gap-[10px] ">
          <input
            required
            type="text"
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            placeholder="Zip code"
            className="border border-gray-300 rounded-xl p-2 w-full"
          />
          <input
            required
            type="text"
            placeholder="Country"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            className="border border-gray-300 rounded-xl p-2 w-full"
          />
        </div>
        <input
          required
          type="number"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone number"
          className="border border-gray-300 rounded-xl p-2 w-full"
        />
      </div>
      <div className="w-[50%] w-full flex flex-col gap-[20px] max-w-[450px]">
        <h2 className="text-[24px] font-medium">Cart Totals</h2>
        <div className="flex flex-col gap-[10px] mt-[20px]">
          <div className="flex justify-between">
            <p className="text-gray-500">SubTotal</p>
            <div>₹ {getTotalCartAmount()}</div>
          </div>
          <hr className="border-b border-gray-500" />
          <div className="flex justify-between">
            <p className="text-gray-500">Delivery Fee</p>
            <div>{getTotalCartAmount() === 0 ? "₹ 0" : "₹ 50"}</div>
          </div>
          <hr className="border-b border-gray-500" />
          <div className="flex justify-between">
            <p>Total</p>
            <div>
              {" "}
              {getTotalCartAmount() === 0 ? "₹ 0" : getTotalCartAmount() + 50}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-[tomato] text-white rounded-xl w-[200px]"
        >
          Proceed To Payment
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
