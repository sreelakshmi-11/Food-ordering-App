import React, { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../StoreContext";
import axios from "axios";
import { useEffect } from "react";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const verifyPayment = async () => {
    const response = await axios.post(`${url}/order/verify`, {
      orderId,
      success,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div className="flex min-h-[40vh] w-full items-center justify-center my-auto">
      <div className="w-[100px] h-[100px] text-center border-5 border-[#bdbdbd] border-t-[tomato] rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;
