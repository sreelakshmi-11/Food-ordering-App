import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import axios from "axios";
import { assets } from "../assets/assets/assets";
const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    const response = await axios.get(`${url}/order/orders`, {
      headers: { token },
    });
    const orders = response.data.orders;
    setOrders(orders);
  };
  const formattedOrders = orders.map((order) => {
    const itemSummary = (order.items || [])
      .map((item) => `${item.name} x ${item.quantity}`)
      .join(", ");

    const totalItemCount = (order.items || []).reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return {
      id: order._id,
      items: itemSummary,
      count: totalItemCount,
      amount: order.amount,
      status: order.status,
    };
  });
  useEffect(() => {
    if (token) getOrders();
  }, [token]);
  console.log(orders);

  return (
    <div className="p-6 space-y-6">
      {formattedOrders.map((order) => (
        <div
          key={order.id}
          className="border p-4 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <img src={assets.parcel_icon} className="w-12 h-12" alt="box" />
            <p className="text-gray-700 font-medium w-[500px]">{order.items}</p>
          </div>

          <div className="flex items-center gap-10">
            <p className="font-semibold">₹{order.amount}</p>
            <p className="text-gray-600">Items: {order.count}</p>

            <p className="text-red-500 font-medium">● {order.status}</p>
          </div>

          <button className="px-4 py-2 bg-red-200 text-red-700 rounded-lg">
            Track Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
