import Order from "../Model/orderModel.js";
import User from "../Model/UserModel.js";
import Stripe from "stripe";

//placing user order for frontend

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const frontendUrl = "http://localhost:5174";
    const newOrder = new Order({
      userId: userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 50 * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });
    await newOrder.save();
    await User.findOneAndUpdate({ _id: userId }, { cartData: {} });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: "true" });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false, message: "not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
//user orders for frontend

export const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

///listing orders for admin panel

export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = req.body.status;
    await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
