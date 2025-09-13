import jwt from "jsonwebtoken";

import prisma from "../models/prismaClient.js";

export default class UserController {
  static async checkUser(req, res) {
    const secret = process.env.JWT_SECRET;

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    try {
      const decoded = jwt.verify(token, secret);

      const user = await prisma.user.findFirst({ where: { id: decoded.id } });

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      res.status(200).json({ id: user.id, name: user.name });
    } catch (error) {
      return res.status(401).json({ message: "Invalid token!" });
    }
  }
}
