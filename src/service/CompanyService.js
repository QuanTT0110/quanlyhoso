import Company from "../models/CompanyModel.js";
import AppDataSource from "../config/ConfigConnection.js";

const companyResponsitory = AppDataSource.getRepository(Company);

export const createCompany = async (company, type) => {
    return await companyResponsitory.save(
        companyResponsitory.create({ ...company, type })
    );
};

export const saveCompany = async (company) => {
    return await companyResponsitory.save(company);
};

export const getCompany = async (companyId) => {
    return await companyResponsitory.findOne({
        where: {
            id: companyId,
        },
        relations: {
            type: true,
        },
    });
};

export const deleteCompany = async (companyId) => {
    return await companyResponsitory.delete({ id: companyId });
};

export const getListCompany = async () => {
    return await companyResponsitory.find({
        relations: {
            type: true,
        },
    });
};