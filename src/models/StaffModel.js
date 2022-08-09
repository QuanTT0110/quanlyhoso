import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Staff",
    tableName: "Staff",
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: "uuid",
        },
        name: {
            type: "text",
        },
        phone: {
            type: "varchar",
        },
        address: {
            type: "varchar",
        },
        age: {
            type: "int",
        },
        gender: {
            type: "boolean",
        },
        password: {
            type: "text",
            select: false,
        },
        isRoot: {
            type: "boolean",
        },
        active: {
            type: "boolean",
        },
        email: {
            type: "varchar",
        }
    },
    relations: {
        department: {
            target: "Department",
            type: "many-to-one",
            joinColumn: true,
        },
        documents: {
            target: "Document",
            type: "one-to-many",
            inverseSide: "Staff",
            onDelete: "SET NULL",
        },
    },
})