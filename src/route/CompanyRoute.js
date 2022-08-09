import express from "express";
import { verifyToken, verifyRoot } from "../middleware/Authentication.js";
import companyController from "../controller/CompanyController.js";
import validate from "../middleware/ValidateParamsBody.js";
const router = express.Router();
router.use(verifyToken);
router.post(
  "/",
    verifyRoot,
    validate.companyRequest,
  companyController.create
);
router.get("/:id", companyController.getCompany);
router.put(
  "/:id",
    verifyRoot,
    validate.companyRequest,
  companyController.update
);
router.get("/", companyController.getListCompany);
router.all("*", (req, res, next) => {
  return next();
});

export default router;