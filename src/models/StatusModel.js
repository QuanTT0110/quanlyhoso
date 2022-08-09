import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Status",
    tableName: "Status",
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