import Status from "../models/StatusModel.js";
import AppDataSource from "../ConfigConnection.js";

const statusResponsitory = AppDataSource.getRepository(Status);

export const getStatus = async (statusId) => {
    return await statusResponsitory.findOneBy({id: statusId});
};

export const getListStatus = async () => {
    return await statusResponsitory.find([]);
}