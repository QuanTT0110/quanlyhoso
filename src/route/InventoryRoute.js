import express from "express";
import { verifyToken, verifyRoot } from "../middleware/Authentication.js";
import inventoryController from "../controller/InventoryController.js";
import validate from "../middleware/ValidateParamsBody.js";
const router = express.Router();
router.use(verifyToken);
router.post(
  "/",
    verifyRoot,
    validate.inventoryRequest,
  inventoryController.create
);
router.get("/:id", inventoryController.getInventory);
router.put(
  "/:id",
    verifyRoot,
    validate.inventoryRequest,
  inventoryController.update
);
router.get("/", inventoryController.getListInventory);
router.all("*", (req, res, next) => {
  return next();
});

export default router;