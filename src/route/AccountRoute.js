import express from "express";
import staffController from "../controller/StaffController.js";
import { verifyRoot, verifyToken } from "../middleware/Authentication.js";

const router = express.Router();

router.post("/login", staffController.login);
router.post("/register", verifyToken, verifyRoot, staffController.register);
router.all("*", (req, res, next) => {
    return next();
})

export default router;