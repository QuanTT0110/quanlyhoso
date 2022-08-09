import express from "express";
import { verifyToken, verifyRoot } from "../middleware/Authentication.js";
import departmentController from "../controller/DepartmentController.js";
import validate from "../middleware/ValidateParamsBody.js";
const router = express.Router();
router.use(verifyToken);
router.post(
  "/",
    verifyRoot,
    validate.departmentRequest,
  departmentController.create
);
router.get("/:id", departmentController.getDepartment);
router.put(
  "/:id",
    verifyRoot,
    validate.departmentRequest,
  departmentController.update
);
router.get("/", departmentController.getListDepartment);
router.all("*", (req, res, next) => {
  return next();
});

export default router;