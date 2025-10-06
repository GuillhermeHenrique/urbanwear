import { Router } from "express";

const router = Router();

// controller
import CartController from "../controllers/CartController.js";

// middlewares
import checkToken from "../middlewares/check-token.js";

router.post("/", checkToken, CartController.create);
router.get("/", checkToken, CartController.getAll);
router.get("/:cartItemId", checkToken, CartController.getCartItemById);

export default router;
