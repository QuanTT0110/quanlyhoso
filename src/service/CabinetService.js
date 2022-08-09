import Cabinet from "../models/CabinetModel.js";
import AppDataSource from "../config/ConfigConnection.js";

const cabinetResponsitory = AppDataSource.getRepository(Cabinet);

export const createCabinet = async (cabinet, inventory) => {
    return await cabinetResponsitory.save(
        cabinetResponsitory.create({ ...cabinet, inventory })
    );
};

export const saveCabinet = async (cabinet) => {
    return await cabinetResponsitory.save(cabinet);
};

export const getCabinet = async (cabinetId) => {
    return await cabinetResponsitory.findOne({
        where: {
            id: cabinetId,
        },
        relations: {
            inventory: true,
        }
    });
};

export const deleteCabinet = async (cabinetId) => {
    return await cabinetResponsitory.delete({ id: cabinetId });
};

export const getListCabinet = async () => {
    return await cabinetResponsitory.find({
        relations: {
            inventory: true,
        },
    });
}