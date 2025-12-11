import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [food, setFood] = useState([]);

  const url = "http://localhost:8000";

  const getFoodItems = async () => {
    try {
      const { data } = await axios.get(`${url}/food/listFood`);
      setFood(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCartItems = async () => {
    try {
      if (token) {
        const response = await axios.get(`${url}/cart/get`, {
          headers: { token },
        });
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const AddToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      await axios.post(
        `${url}/cart/addToCart`,
        { itemId },
        { headers: { token } }
      );
    }
  };
  const handleDelete = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      axios.post(`${url}/cart/remove`, { itemId }, { headers: { token } });
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food.find((food) => food._id === item);
        if (!itemInfo) continue;
        totalAmount += (itemInfo.price || 0) * (cartItems[item] * 1);
      }
    }
    return totalAmount;
  };
  useEffect(() => {
    if (token) getCartItems();
    getFoodItems();
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  const value = {
    food,
    cartItems,
    setCartItems,
    AddToCart,
    handleDelete,
    getTotalCartAmount,
    url,
    showLogin,
    setShowLogin,
    token,
    setToken,
    getFoodItems,
  };
  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
