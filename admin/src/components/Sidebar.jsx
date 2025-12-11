import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const [active, setActive] = useState("add");
  const items = [
    { id: "add", label: "Add Items", image: assets.add_icon, path: "/add" },
    { id: "list", label: "List Items", icon: assets.order_icon, path: "/list" },
    { id: "orders", label: "Orders", icon: assets.order_icon, path: "/order" },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] border-r bg-white">
      <nav className="flex flex-col p-[20px] gap-4">
        {items.map((item, i) => (
          <NavLink to={item.path} key={i}>
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-md text-left text-sm font-medium border transition
              ${
                active === item.id
                  ? "border-2 border-[tomato]"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <img src={item.image || item.icon} />
              <span>{item.label}</span>
            </button>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
