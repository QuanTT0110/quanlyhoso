import express from "express";
import { verifyToken, verifyRoot } from "../middleware/Authentication.js";
import drawerController from "../controller/DrawerController.js";
import validate from "../middleware/ValidateParamsBody.js";
const router = express.Router();
router.use(verifyToken);
router.post(
    "/",
      verifyRoot,
      validate.drawerRequest,
    drawerController.create
);
router.get("/:id", drawerController.getDrawer);
router.put(
    "/:id",
      verifyRoot,
      validate.drawerRequest,
    drawerController.update
);
router.get("/", drawerController.getListDrawer);
router.all("*", (req, res, next) => {
    return next();
});

export default router;