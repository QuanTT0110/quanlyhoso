import express from "express";
import AccountRouter from "./AccountRoute";
import CompanyRouter from "./CompanyRoute.js";
import DepartmentRouter from "./DepartmentRoute.js";
import InventoryRouter from "./InventoryRoute.js";
import CabinetRouter from "./CabinetRoute.js";
import DrawerRouter from "./DrawerRoute.js";
import StaffRouter from "./StaffRoute.js";

const router = express.Router();

router.use("/", AccountRouter);
router.use("/staff", StaffRouter);
router.use("/company", CompanyRouter);
router.use("/inventory", InventoryRouter);
router.use("/department", DepartmentRouter);
router.use("/cabinet", CabinetRouter);
router.use("/drawer", DrawerRouter);
router.all("*", (req, res, next) => {
  return next();
});
export default router;