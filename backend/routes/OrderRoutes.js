import { Router } from "express";

const router = Router();

// controllers
import OrderController from "../controllers/OrderController.js";

// middlewares
import checkToken from "../middlewares/check-token.js";

router.post("/user", checkToken, OrderController.createUserData);
router.get("/user", checkToken, OrderController.getUserData);
router.post("/", checkToken, OrderController.createOrder);
router.get("/", checkToken, OrderController.getUserOrdersByToken);

export default router;
