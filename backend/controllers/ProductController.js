import { Prisma } from "@prisma/client";

// models
import prisma from "../models/prismaClient.js";

// zod validations
import createProductSchema from "../schemas/ProductSchemas.js";

export default class ProductController {
  static async create(req, res) {
    // validations
    const validatedData = createProductSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(422).json({
        message: validatedData.error.issues[0]?.message,
      });
    }

    const { name, category, price } = validatedData.data;

    const images = req.files;

    if (!images || images.length == 0) {
      return res.status(422).json({ message: "Image is required!" });
    }

    const imagesPath = images.map((image) => image.filename);

    try {
      const createdProduct = await prisma.product.create({
        data: {
          name,
          category,
          price: new Prisma.Decimal(price),
          images: imagesPath,
        },
      });

      res.status(201).json({
        message: "Successfully created product!",
        product: createdProduct,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        include: { cartsItem: true },
      });

      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getProductById(req, res) {
    const id = req.params.id;

    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: { cartsItem: true },
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removeProduct(req, res) {
    const id = req.params.id;

    try {
      const product = await prisma.product.findUnique({ where: { id } });

      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }

      await prisma.product.delete({ where: { id } });

      res.status(200).json({ message: "Product removed successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getProductsByCategory(req, res) {
    const categoryParam = req.params.productCategory;

    const category = categoryParam.toUpperCase();

    try {
      const products = await prisma.product.findMany({
        where: { category },
      });

      if (!products) {
        return res.status(404).json({ message: "Category don't exists!" });
      }

      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
