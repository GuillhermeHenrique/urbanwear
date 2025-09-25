import { Router } from "express";

const router = Router();

// controller
import CartController from "../controllers/CartController.js";

// middlewares
import checkToken from "../middlewares/check-token.js";

router.post("/", checkToken, CartController.create);
router.get("/", checkToken, CartController.getAll);

export default router;
