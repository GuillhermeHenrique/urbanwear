import jwt from "jsonwebtoken";

const createUserToken = async (user, req, res) => {
  try {
    const secret = process.env.JWT_SECRET;

    const token = jwt.sign(
      {
        name: user.name,
        id: user.id,
      },
      secret,
      { expiresIn: "7d" }
    );

    // send token like cookie HTTP Only
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res
      .status(200)
      .json({ message: "You have been authenticated!", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createUserToken;
