import jwt from "jsonwebtoken";

import prisma from "../models/prismaClient.js";

import bcrypt from "bcrypt";

// zod validations
import { editUserSchema } from "../schemas/UserSchemas.js";

// middlewares
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class UserController {
  static async checkUser(req, res) {
    const secret = process.env.JWT_SECRET;

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    try {
      const decoded = jwt.verify(token, secret);

      const user = await prisma.user.findUnique({ where: { id: decoded.id } });

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      res.status(200).json({ id: user.id, name: user.name });
    } catch (error) {
      return res.status(401).json({ message: "Invalid token!" });
    }
  }

  static async getUserById(req, res) {
    try {
      const id = req.params.id;

      const user = await prisma.user.findUnique({
        where: { id },
        include: { cart: true },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async editUser(req, res) {
    const id = req.params.id;

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.id != id) {
      return res.status(401).json({ message: "Access denied!" });
    }

    const validatedData = editUserSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(422).json({
        message: validatedData.error.issues[0]?.message,
      });
    }

    const { name, email, password } = validatedData.data;

    user.name = name;

    if (req.file) {
      user.image = req.file.filename;
    }

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (user.email != email && userExists) {
      return res
        .status(422)
        .json({ message: "This e-mail already registered!" });
    }

    user.email = email;

    if (password != null) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          image: user.image,
        },
      });

      res
        .status(200)
        .json({ message: "Successfully updated user!", user: updatedUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
