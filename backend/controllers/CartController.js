// prisma
import prisma from "../models/prismaClient.js";

// zod validations
import { createCartItemSchema } from "../schemas/CartSchemas.js";

// helpers
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class CartController {
  static async create(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const validatedData = createCartItemSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(422).json({
        message: validatedData.error.issues[0]?.message,
      });
    }

    const { amount, productId } = validatedData.data;

    try {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }

      const cart = await prisma.cart.findFirst({ where: { userId: user.id } });

      const existingItem = await prisma.cartItem.findFirst({
        where: { productId, cartId: cart.id },
      });

      let cartItem;

      if (existingItem) {
        cartItem = await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { amount: existingItem.amount + amount },
        });
      } else {
        cartItem = await prisma.cartItem.create({
          data: { amount, productId, cartId: cart.id },
        });
      }

      res
        .status(200)
        .json({ message: "Product added to cart successfully!", cartItem });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    try {
      const cart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: {
          items: { include: { product: true } },
        },
      });

      res
        .status(200)
        .json({ products: cart.items.map((item) => item.product) });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
