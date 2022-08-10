import Staff from "../models/StaffModel.js";
import AppDataSource from "../config/ConfigConnection.js";

const staffResponsitory = AppDataSource.getRepository(Staff);

export const createStaff = async (staff, department) => {
    return await staffResponsitory.save(
        staffResponsitory.create({ ...staff, department })
    );
};

export const saveStaff = async (staff) => {
    return await staffResponsitory.save(staff);
};

export const getStaff = async (staffId) => {
    return await staffResponsitory.findOne({
        where: {
            id: staffId,
        },
        relations: {
            department: true,
        }
    });
};

export const deleteStaff = async (staffId) => {
    return await staffResponsitory.delete({ id: staffId });
};

export const getListStaff = async (page,limit) => {
    return await staffResponsitory.find({
        skip: (page-1)*limit,
        take: limit,
        relations: {
            department: true,
        },
    });
};

export const getStaffByEmail = async (email) => {
    return await staffResponsitory.findOne({
        where: {
            email: email,
        },
        select: {
            id: true,
            name: true,
            age: true,
            gender: true,
            address: true,
            phone: true,
            email: true,
            password: true,
            isRoot: true,
            active: true,
        },
        relations: {
            department: true,
        },
    });
};