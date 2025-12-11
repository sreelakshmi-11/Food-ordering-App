import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../../../frontend/src/assets/assets/assets";

const Order = () => {
  const BackendURL = "http://localhost:8000";
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await axios.get(`${BackendURL}/order/list`);
    const totalOrders = response.data.orders;
    setOrders(totalOrders);
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
      address: order.address,
    };
  });

  const handleStatusChange = async (id, newStatus) => {
    const response = await axios.post(`${BackendURL}/order/update/${id}`, {
      status: newStatus,
    });
    if (response.data.success) {
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } else {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 w-full p-4">
        {formattedOrders.map((order) => (
          <div key={order.id}>
            <div className="border p-4 rounded-lg flex items-center justify-between">
              <div className="flex gap-4">
                <div>
                  <img
                    src={assets.parcel_icon}
                    className="w-12 h-12"
                    alt="box"
                  />
                  <div className="flex flex-col items-start justify-start">
                    <p className=" flex flex-col text-gray-700 font-medium">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className=" flex flex-col text-gray-700 font-medium">
                      {order.address.address}
                    </p>
                    <p className=" flex flex-col text-gray-700 font-medium">
                      {order.address.city}
                    </p>
                    <p className=" flex flex-col text-gray-700 font-medium">
                      {order.address.state}
                    </p>
                    <p className=" flex flex-col text-gray-700 font-medium">
                      {order.address.zipcode}
                    </p>
                  </div>
                </div>
                <p className="flex justify-center text-gray-700 font-medium w-[500px] items-center">
                  {order.items}
                </p>
              </div>

              <div className="flex justify-start items-start gap-10">
                <p className="font-semibold">₹{order.amount}</p>
                <p className="text-gray-600">Items: {order.count}</p>
              </div>

              <select
                onChange={(e) => {
                  const newStatus = e.target.value;
                  handleStatusChange(order.id, newStatus);
                }}
                value={order.status}
                className="px-4 py-2 bg-red-200 text-red-700 rounded-lg"
              >
                <option>Food Processing</option>
                <option>Out for delivery</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
