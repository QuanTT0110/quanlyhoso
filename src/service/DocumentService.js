import Document from "../models/Document.js";
import AppDataSource from "../ConfigConnection.js";

const documentResponsitory = AppDataSource.getRepository(Document);

export const createDocument = async (document, cabinet) => {
    return await drawerResponsitory.save(
        drawerResponsitory.create({ ...drawer, cabinet })
    );
};

export const saveDocument = async (drawer) => {
    return await drawerResponsitory.save(drawer);
};

export const getDocument = async (drawerId) => {
    return await drawerResponsitory.findOne({
        where: {
            id: drawerId,
        },
        relations: {
            cabinet: true,
        }
    });
};

export const deleteDocument = async (drawerId) => {
    return await drawerResponsitory.delete({ id: drawerId });
};

export const getListDocument = async (page,limit) => {
    return await drawerResponsitory.find({
        skip: (page-1)*limit,
        take: limit,
        relations: {
            cabinet: true,
        },
    });
}