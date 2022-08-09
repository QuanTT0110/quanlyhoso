import express from "express";
import { verifyToken, verifyRoot } from "../middleware/Authentication.js";
import cabinetController from "../controller/CabinetController.js";
import validate from "../middleware/ValidateParamsBody.js";
const router = express.Router();
router.use(verifyToken);
router.post(
    "/",
    verifyRoot,
      validate.cabinetRequest,
    cabinetController.create
);
router.get("/:id", cabinetController.getCabinet);
router.put(
    "/:id",
      verifyRoot,
      validate.cabinetRequest,
    cabinetController.update
);
router.get("/", cabinetController.getListCainet);
router.all("*", (req, res, next) => {
    return next();
});

export default router;