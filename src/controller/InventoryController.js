import {
    createInventory,
    saveInventory,
    getInventory,
    getListInventory
} from "../service/InventoryService.js";
import { getCompany } from "../service/CompanyService.js";

const inventoryController = {
    create: async (req, res, next) => {
        try {
            const { name, companyId } = req.body;
            const company = await getCompany(companyId);
            if (!company) {
                const error = new Error("Company not found");
                error.statusCode = 404;
                return next(error);
            }
            const result = await createInventory({ name }, company);
            return res.status(200).json({ msg: "Create inventory successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const inventory = await getInventory(req.params.id);
            if (!inventory) {
                const error = new Error("Inventory not found");
                error.statusCode = 404;
                return next(error);
            }
            req.body.company = await getCompany(req.body.companyId);
            Object.assign(inventory, req.body);
            const updatedInventory = await saveInventory(inventory);
            delete updatedInventory.companyId;
            return res.status(200).json({ msg: "Update inventory successfully", data: updatedInventory });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getInventory: async (req, res, next) => {
        try {
            const inventoryId = req.params.id;
            const result = await getInventory(inventoryId);
            return res.status(200).json({ msg: "Get inventory successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getListInventory: async (req, res, next) => {
        try {
            const result = await getListInventory();
            return res.status(200).json({ msg: "Get list of inventory successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};

export default inventoryController;