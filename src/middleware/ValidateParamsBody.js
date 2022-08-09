import Ajv from "ajv";

const ajv = new Ajv();

const companyValidate = ajv.compile({
    type: "object",
    properties: {
        name: { type: "string" },
        address: { type: "string" },
        typeId: { type: "string" },
    },
    required: ["name", "address", "typeId"],
    additionalProperties: false,
});

const inventoryValidate = ajv.compile({
    type: "object",
    properties: {
        name: { type: "string" },
        companyId: { type: "string" },
    },
    required: ["name", "companyId"],
    additionalProperties: false,
});

const cabinetValidate = ajv.compile({
    type: "object",
    properties: {
        name: { type: "string" },
        inventoryId: { type: "string" },
    },
    required: ["name", "inventoryId"],
    additionalProperties: false,
});

const drawerValidate = ajv.compile({
    type: "object",
    properties: {
        name: { type: "string" },
        cabinetId: { type: "string" },
    },
    required: ["name", "cabinetId"],
    additionalProperties: false,
});

const departmentValidate = ajv.compile({
    type: "object",
    properties: {
        name: { type: "string" },
        companyId: { type: "string" },
    },
    required: ["name", "companyId"],
    additionalProperties: false,
});

const staffValidate = ajv.compile({
    type: "object",
    properties: {
        name: { type: "string" },
        age: { type: "integer" },
        gender: { type: "boolean" },
        address: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        isRoot: { type: "boolean" },
        active: { type: "boolean" },
        departmentId: { type: "string" },
    },
    required: ["phone",
        "email",
        "password",
        "name",
        "age",
        "gender",
        "address",
        "isRoot",
        "active",
        "departmentId"],
    additionalProperties: false,
});

const validate = {
    companyRequest: (req, res, next) => {
        if (!companyValidate(req.body)) {
            const error = new Error("All fields of company are required");
            error.statusCode = 403;
            return next(error);
        } else {
            next();
        }
    },

    inventoryRequest: (req, res, next) => {
        if (!inventoryValidate(req.body)) {
            const error = new Error("All fields of inventory are required");
            error.statusCode = 403;
            return next(error);
        } else {
            next();
        }
    },

    cabinetRequest: (req, res, next) => {
        if (!cabinetValidate(req.body)) {
            const error = new Error("All fields of cabinet are required");
            error.statusCode = 403;
            return next(error);
        } else {
            next();
        }
    },

    drawerRequest: (req, res, next) => {
        if (!drawerValidate(req.body)) {
            const error = new Error("All fields of drawer are required");
            error.statusCode = 403;
            return next(error);
        } else {
            next();
        }
    },

    departmentRequest: (req, res, next) => {
        if (!departmentValidate(req.body)) {
            const error = new Error("All fields of department are required");
            error.statusCode = 403;
            return next(error);
        } else {
            next();
        }
    },
    
    staffRequest: (req, res, next) => {
        let active = req.body.active.toLowerCase();
        let isRoot = req.body.isRoot.toLowerCase();
        if (
            !(active == "true" || active == "false") ||
            !(isRoot == "true" || isRoot == "false")
        ) {
            const error = new Error("Invalid input");
            error.statusCode = 403;
            return next(error);
        }
        req.body.active = JSON.parse(active);
        req.body.isRoot = JSON.parse(isRoot);
        if (!staffValidate(req.body)) {
            const error = new Error("All fields of staff are required");
            error.statusCode = 403;
            return next(error);
        } else {
            next();
        }
    },
};

export default validate;