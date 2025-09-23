// middlewares
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

const checkUserAdmin = async (req, res, next) => {
  try {
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user || !user.admin) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this route!" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token!" });
  }
};

export default checkUserAdmin;
