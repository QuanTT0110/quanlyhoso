import {
    createCabinet,
    saveCabinet,
    getCabinet,
    getListCabinet
} from "../service/CabinetService.js";
import { getInventory } from "../service/InventoryService.js";

const cabinetController = {
    create: async (req, res, next) => {
        try {
            const { name, inventoryId } = req.body;
            const inventory = await getInventory(inventoryId);
            if (!inventory) {
                const error = new Error("Inventory not found");
                error.statusCode = 404;
                return next(error);
            }
            const result = await createCabinet({ name }, inventory);
            return res.status(200).json({ msg: "Create cabinet successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const cabinet = await getCabinet(req.params.id)
            if (!cabinet) {
                const error = new Error("Cabinet not found");
                error.statusCode = 404;
                return next(error);
            }
            req.body.inventory = await getInventory(req.body.inventoryId);
            Object.assign(cabinet, req.body);
            const updatedCabinet = await saveCabinet(cabinet);
            delete updatedCabinet.inventoryId;
            return res.status(200).json({ msg: "Update cabinet successfully", data: updatedCabinet });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getCabinet: async (req, res, next) => {
        try {
            const result = await getCabinet(req.params.id);
            return res.status(200).json({ msg: "Get cabinet successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getListCainet: async (req, res, next) => {
        try {
            const result = await getListCabinet();
            return res.status(200).json({ msg: "Get list of cabinet successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

};

export default cabinetController;