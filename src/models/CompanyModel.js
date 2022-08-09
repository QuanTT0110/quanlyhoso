import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Company",
    tableName: "Company",
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: "uuid"
        },
        name: {
            type: "varchar",
        },
        address: {
            type: "varchar",
        },
    },
    relations: {
        type: {
            type: "one-to-one",
            target: "Type",
            joinColumn: true,
        },
        departments: {
            target: "Department",
            type: "one-to-many",
            onDelete: "SET NULL",
            inverseSide: "Company",
        },
        inventories: {
            target: "Inventory",
            type: "one-to-many",
            onDelete: "SET NULL",
            inverseSide: "Company",
        },
    }
})