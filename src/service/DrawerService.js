import Drawer from "../models/DrawerModel.js";
import AppDataSource from "../config/ConfigConnection.js";

const drawerResponsitory = AppDataSource.getRepository(Drawer);

export const createDrawer = async (drawer, cabinet) => {
    return await drawerResponsitory.save(
        drawerResponsitory.create({ ...drawer, cabinet })
    );
};

export const saveDrawer = async (drawer) => {
    return await drawerResponsitory.save(drawer);
};

export const getDrawer = async (drawerId) => {
    return await drawerResponsitory.findOne({
        where: {
            id: drawerId,
        },
        relations: {
            cabinet: true,
        }
    });
};

export const deleteDrawer = async (drawerId) => {
    return await drawerResponsitory.delete({ id: drawerId });
};

export const getListDrawer = async (page,limit) => {
    return await drawerResponsitory.find({
        skip: (page-1)*limit,
        take: limit,
        relations: {
            cabinet: true,
        },
    });
}