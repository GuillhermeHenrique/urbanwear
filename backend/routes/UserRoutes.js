import { Router } from "express";

const router = Router();

// controller
import UserController from "../controllers/UserController.js";

router.get("/", UserController.home);

export default router;
