import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Type",
    tableName: "Type",
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: "uuid"
        },
        name: {
            type: "text"
        },
    },
})