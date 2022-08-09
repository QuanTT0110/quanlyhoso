import Department from "../models/DepartmentModel.js";
import AppDataSource from "../config/ConfigConnection.js";

const departmentResponsitory = AppDataSource.getRepository(Department);

export const createDepartment = async (department, company) => {
    return await departmentResponsitory.save(
        departmentResponsitory.create({...department,company})
    );
};

export const saveDepartment = async (department) => {
    return await departmentResponsitory.save(department);
};

export const getDepartment = async (departmentId) => {
    return await departmentResponsitory.findOne({
        where: {
            id: departmentId,
        },
        relations: {
            company: true,
        }
    });
};

export const deleteDepartment = async (departmentId) => {
    return await departmentResponsitory.delete({ id: departmentId });
};

export const getListDepartment = async () => {
    return await departmentResponsitory.find({
        relations: {
            company: true,
        },
    });
}