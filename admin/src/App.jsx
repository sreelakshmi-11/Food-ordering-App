import React from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Order from "./pages/Order.jsx";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster />
      <Navbar />
      <hr />
      <div className="flex ">
        <Sidebar />
        <Routes>
          <Route path="/order" element={<Order />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
