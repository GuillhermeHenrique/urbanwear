import jwt from "jsonwebtoken";

// middlewares
import getToken from "../helpers/get-token.js";

// middleware to validate token from HTTP Only cookie
const checkToken = (req, res, next) => {
  const secret = process.env.JWT_SECRET;

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Access denied!" });
  }

  try {
    const verified = jwt.verify(token, secret);

    req.user = verified;

    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token!" });
  }
};

export default checkToken;
