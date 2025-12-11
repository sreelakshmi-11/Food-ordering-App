import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import PlaceOrder from "./pages/PlaceOrder";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";
import { Toaster } from "react-hot-toast";
import { StoreContext } from "./StoreContext";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";

const App = () => {
  const { showLogin, setShowLogin } = useContext(StoreContext);
  return (
    <>
      <Toaster />
      {showLogin && <LoginPopup />}
      <div className="px-[100px] mb-[100px]">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
