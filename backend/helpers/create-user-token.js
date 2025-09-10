import jwt from "jsonwebtoken";

const createUserToken = async (user, req, res) => {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ message: "JWT secret is not defined!" });
    }

    const token = jwt.sign(
      {
        name: user.name,
        id: user.id,
      },
      secret
    );

    // send token like cookie HTTP Only
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res
      .status(200)
      .json({ message: "You have been authenticated!", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createUserToken;
