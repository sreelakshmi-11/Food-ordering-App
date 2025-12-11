import User from "../Model/UserModel.js";

export const addCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const itemId = req.body.itemId;
    const userData = await User.findById(userId);
    let cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    await User.findOneAndUpdate({ _id: userId }, { cartData });
    res.json({ success: true, message: "Item added to cart" }, cartData);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.body.itemId;
    const userData = await User.findById(userId);
    const cartData = userData.cartData;
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await User.findOneAndUpdate({ _id: userId }, { cartData });
    res.json({ success: true, message: "Item removed from cart", cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId);
    const cartData = userData.cartData;
    res.json({
      success: true,
      message: "fetched cart items successfully",
      cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
