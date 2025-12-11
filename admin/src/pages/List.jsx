import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const List = () => {
  const BackendURL = "http://localhost:8000";
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await axios.get(`${BackendURL}/food/listFood`);
    setItems(response.data.data);
    if (response.data.success) {
      toast.success("Fetched successfully");
    } else {
      toast.error(response.data.message, "Error");
    }
  };

  const removeItem = async (id) => {
    const response = await axios.delete(`${BackendURL}/food/removeFood/${id}`);
    if (response.data.success) {
      fetchItems();
      toast.success("Item removed successfully");
    } else {
      toast.error(response.data.message, "Error");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-6 px-3 py-2">
        <div>Image</div>
        <div>Name</div>
        <div>Description</div>
        <div>Price</div>
        <div>Category</div>
        <div>Action</div>
      </div>
      <hr />
      <div>
        {items.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-6 px-3 py-2 flex items-center justify-center"
          >
            <img src={item.image} className="w-[50px] h-[50px]" />
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>{item.price}</div>
            <div>{item.category}</div>
            <div
              onClick={() => removeItem(item._id)}
              className="cursor-pointer px-3 py-2 bg-[tomato] w-[100px] text-center rounded-xl flex justify-center items-center"
            >
              Delete
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
