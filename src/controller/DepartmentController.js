import {
    createDepartment,
    saveDepartment,
    getDepartment,
    getListDepartment
} from "../service/DepartmentService.js";
import { getCompany } from "../service/CompanyService.js";

const departmentController = {
    create: async (req, res, next) => {
        try {
            const { name, companyId } = req.body;
            const company = await getCompany(companyId);
            if (!company) {
                const error = new Error("Company not found");
                error.statusCode = 404;
                return next(error);
            }
            const result = await createDepartment({ name }, company);
            return res.status(200).json({ msg: "Create department successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const department = await getDepartment(req.params.id);
            if (!department) {
                const error = new Error("Department not found");
                error.statusCode = 404;
                return next(error);
            }
            req.body.company = await getCompany(req.body.companyId);
            Object.assign(department, req.body);
            const updatedDepartment = await saveDepartment(department);
            delete updatedDepartment.companyId;
            return res.status(200).json({ msg: "Update department successfully", data: updatedDepartment });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getDepartment: async (req, res, next) => {
        try {
            const departmentId = req.params.id;
            const result = await getDepartment(departmentId);
            return res.status(200).json({ msg: "Get department successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getListDepartment: async (req, res, next) => {
        try {
            const result = await getListDepartment();
            return res.status(200).json({ msg: "Get list of department successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};
export default departmentController;

