import prisma from "../models/prismaClient.js";

import bcrypt from "bcrypt";

// zod validations
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";

// helpers
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class AuthController {
  static async register(req, res) {
    // validations
    const validatedData = registerSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(422).json({
        message: validatedData.error.issues[0]?.message,
      });
    }

    const { name, email, password, admin } = validatedData.data;

    // check if user exists
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.status(422).json({ message: "This email already exists!" });
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
          admin,
          cart: { create: {} },
        },
        include: { cart: true },
      });

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    // validations
    const validatedData = loginSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(422).json({
        message: validatedData.error.issues[0]?.message,
      });
    }

    const { email, password } = validatedData.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(422).json({ message: "User not found!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Invalid password!" });
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      res
        .status(200)
        .json({ user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async logout(req, res) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully!" });
  }
}
