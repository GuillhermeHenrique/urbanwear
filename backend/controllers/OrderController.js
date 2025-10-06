// prisma
import prisma from "../models/prismaClient.js";

// zod validations
import { createUserDataSchema } from "../schemas/OrderSchemas.js";

// helpers
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class OrderController {
  static async createUserData(req, res) {
    // validations
    const validatedData = createUserDataSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(422).json({
        message: validatedData.error.issues[0]?.message,
      });
    }

    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      const {
        name,
        email,
        cpf,
        phone,
        cep,
        address,
        number,
        complement,
        neighborhood,
        city,
        state,
      } = validatedData.data;

      const userData = await prisma.userOrder.create({
        data: {
          name,
          email,
          cpf,
          phone,
          cep,
          address,
          number,
          complement,
          neighborhood,
          city,
          state,
          userId: user.id,
        },
      });

      res.status(200).json({ userData });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserData(req, res) {
    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      if (!user) {
        return req.status(404).json({ message: "User not found!" });
      }

      const userData = await prisma.userOrder.findMany({
        where: { userId: user.id },
      });

      if (!userData) {
        return res
          .status(404)
          .json({ message: "You dont has any registered address yet!" });
      }

      res.status(200).json({ userData });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async createOrder(req, res) {
    const { cartItemId, userOrderId } = req.body;

    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      const cartItem = await prisma.cartItem.findUnique({
        where: { id: cartItemId },
        include: { cart: true },
      });

      if (!cartItem || !cartItem.cart || cartItem.cart.userId !== user.id) {
        return res
          .status(403)
          .json({ message: "Cart item not found for this user" });
      }

      const userOrder = await prisma.userOrder.findUnique({
        where: { id: userOrderId },
      });

      if (!userOrder || userOrder.userId !== user.id) {
        return res
          .status(403)
          .json({ message: "User order not found for this user" });
      }

      const order = await prisma.order.create({
        data: {
          cartItemId,
          userOrderId,
        },
      });

      await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { cartId: null },
      });

      res.status(201).json({ order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserOrdersByToken(req, res) {
    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      const userOrder = await prisma.userOrder.findFirst({
        where: { userId: user.id },
      });

      if (!userOrder) {
        return res
          .status(404)
          .json({ message: "This user has no orders yet!!" });
      }

      const orders = await prisma.order.findMany({
        where: { userOrderId: userOrder.id },
      });

      if (!orders) {
        return res.status(404).json({ message: "No orders were found!" });
      }

      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
