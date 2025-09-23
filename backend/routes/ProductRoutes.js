import { Router } from "express";

const router = Router();

// controller
import ProductController from "../controllers/ProductController.js";

// middlewares
import checkToken from "../helpers/check-token.js";
import checkUserAdmin from "../helpers/check-user-admin.js";
import imageUpload from "../helpers/image-upload.js";

router.post(
  "/create",
  checkToken,
  checkUserAdmin,
  imageUpload.array("images"),
  ProductController.create
);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getProductById);
router.delete(
  "/:id",
  checkToken,
  checkUserAdmin,
  ProductController.removeProduct
);

export default router;
