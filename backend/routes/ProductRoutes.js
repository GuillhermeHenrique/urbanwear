import { Router } from "express";

const router = Router();

// controller
import ProductController from "../controllers/ProductController.js";

// middlewares
import checkToken from "../middlewares/check-token.js";
import checkUserAdmin from "../middlewares/check-user-admin.js";

// helpers
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
router.get(
  "/categories/:categoryName",
  ProductController.getProductsByCategory
);

export default router;
