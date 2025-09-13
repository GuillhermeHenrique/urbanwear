import { Router } from "express";

const router = Router();

// controller
import UserController from "../controllers/UserController.js";

router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);

export default router;
