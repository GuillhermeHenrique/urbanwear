import { Router } from "express";

const router = Router();

// controller
import UserController from "../controllers/UserController.js";

// middlewares
import checkToken from "../helpers/check-token.js";
import imageUpload from "../helpers/image-upload.js";

router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch(
  "/update/:id",
  checkToken,
  imageUpload.single("image"),
  UserController.updateUser
);

export default router;
