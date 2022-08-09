import {
    createDrawer,
    saveDrawer,
    getDrawer,
    getListDrawer
} from "../service/DrawerService.js";
import { getCabinet } from "../service/CabinetService.js";

const drawerController = {
    create: async (req, res, next) => {
        try {
            const { name, cabinetId } = req.body;
            const cabinet = await getCabinet(cabinetId);
            if (!cabinet) {
                const error = new Error("Cabinet not found");
                error.statusCode = 404;
                return next(error);
            }
            const result = await createDrawer({ name }, cabinet);
            return res.status(200).json({ msg: "Create drawer successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const drawer = await getDrawer(req.params.id)
            if (!drawer) {
                const error = new Error("Drawer not found");
                error.statusCode = 404;
                return next(error);
            }
            req.body.cabinet = await getCabinet(req.body.cabinetId);
            Object.assign(drawer, req.body);
            const updatedDrawer = await saveDrawer(drawer);
            delete updatedDrawer.cabinetId;
            return res.status(200).json({ msg: "Update drawer successfully", data: updatedDrawer });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getDrawer: async (req, res, next) => {
        try {
            const result = await getDrawer(req.params.id);
            return res.status(200).json({ msg: "Get drawer successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getListDrawer: async (req, res, next) => {
        try {
            const result = await getListDrawer();
            return res.status(200).json({ msg: "Get list of drawer successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};

export default drawerController;