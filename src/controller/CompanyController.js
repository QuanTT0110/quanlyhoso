import {
    createCompany,
    getCompany,
    saveCompany,
    getListCompany,
} from "../service/CompanyService.js";
import { getType } from "../service/TypeService.js";
const companyController = {
    create: async (req, res, next) => {
        try {
            const { name, address, typeId } = req.body;
            const type = await getType(typeId);
            if (!type) {
                const error = new Error("Type not found");
                error.statusCode = 404;
                return next(error);
            }
            const result = await createCompany({ name, address }, type);
            return res.status(200).json({ msg: "Create company successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const company = await getCompany(req.params.id);
            if (!company) {
                const error = new Error("Company not found");
                error.statusCode = 404;
                return next(error);
            }
            req.body.type = await getType(req.body.typeId);
            Object.assign(company, req.body);
            const updatedCompany = await saveCompany(company);
            delete updatedCompany.typeId;
            return res
                .status(200)
                .json({ msg: "Update company successfully", data: updatedCompany });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    delete: async (req, res, next) => { },
    getCompany: async (req, res, next) => {
        try {
            const companyid = req.params.id;
            const result = await getCompany(companyid);
            return res.status(200).json({ msg: "Get company successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getListCompany: async (req, res, next) => {
        try {
            const result = await getListCompany();
            res.status(200).json({ msg: "Get list of company successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};

export default companyController;