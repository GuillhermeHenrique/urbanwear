import jwt from "jsonwebtoken";

// middleware to validate token from HTTP Only cookie
const checkToken = (req, res, next) => {
  const secret = process.env.JWT_SECRET;

  const token = req.cookies?.token;

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
