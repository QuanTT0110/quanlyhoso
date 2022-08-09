import express from "express";
import staffController from "../controller/StaffController.js";
import { verifyToken, verifyRoot } from "../middleware/Authentication.js";

const router = express.Router();

router.use(verifyToken);
router.get("/", verifyRoot, staffController.getListStaff);
router.all("*", (req, res, next) => {
    return next();
});

export default router;