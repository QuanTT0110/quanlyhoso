import Type from "../models/TypeModel.js";
import AppDataSource from "../config/ConfigConnection.js";

const typeResponsitory = AppDataSource.getRepository(Type);

export const getType = async (typeId) => {
    return await typeResponsitory.findOneBy({id: typeId});
};

export const getListType = async () => {
    return await typeResponsitory.find([]);
}