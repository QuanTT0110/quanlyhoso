import {
    createDocument,
    deleteDocument,
    getDocument,
    getListDocument,
    saveDocument
} from "../service/DocumentService.js";
import { getStatus } from "../service/StatusService.js";

const documentController = {
    create: async (req, res, next) => {
        try {
            const { title, content, createAt, updateAt, statusId, staffId } = req.body;
            const status = await getStatus(statusId);
            if (!status) {
                const error = new Error("Status not found");
                error.statusCode = 404;
                return next(error);
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {

        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {

        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getDocument: async (req, res, next) => {
        try {

        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getListDocument: async (req, res, next) => {
        try {

        } catch (error) {
            console.log(error);
            next(error);
        }
    },
}