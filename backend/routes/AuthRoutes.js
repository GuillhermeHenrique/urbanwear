import { Router } from "express";

const router = Router();

// controller
import AuthController from "../controllers/AuthController.js";

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/check", AuthController.checkUser);
router.post("/logout", AuthController.logout);

export default router;
