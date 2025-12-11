import jwt from "jsonwebtoken";

export const authProtect = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token_Decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: token_Decode.id };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Error" });
  }
};

export default authProtect;
