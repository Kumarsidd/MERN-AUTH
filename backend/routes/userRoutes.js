import express from "express";
import {
  authUser,
  logOutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userControllers.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logOutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

export default router;
