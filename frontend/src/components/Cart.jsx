import React from "react";
import { assets } from "../assets/assets/assets";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, setCartItems, food, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const removeItem = (id) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };
  return (
    <div className="px-[70px]">
      <div className="grid grid-cols-6 p-[10px] text-gray-500">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className="border-b border-gray-500" />

      <div>
        {food.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="grid grid-cols-6 p-[10px] items-center justify-center">
                  <img src={item.image} className="w-[50px]" />
                  <p>{item.name}</p>
                  <p> {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <img
                    src={assets.cross_icon}
                    onClick={() => removeItem(item._id)}
                  />
                </div>
                <hr className="border-b border-gray-500" />
              </div>
            );
          }
        })}
      </div>
      <div className="flex mt-[50px] gap-20">
        <div className="w-[50%] w-full flex flex-col gap-[20px]">
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
                {getTotalCartAmount() === 0 ? "₹ 0" : getTotalCartAmount() + 50}
              </div>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-[tomato] text-white rounded-xl w-[200px]"
            onClick={() => navigate("/order")}
          >
            Proceed To Checkout
          </button>
        </div>
        <div className="w-[50%] w-full flex flex-col gap-[20px]">
          <p className="text-gray-500">
            If you have a promo code,Enter it here
          </p>
          <div className="bg-gray-300 flex justify-between gap-2 rounded-[20px]">
            <input
              type="text"
              placeholder="promo code"
              className="px-4 py-2 outline-none"
            />
            <button className="px-4 py-2 bg-black text-white rounded-xl ">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
