import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Cabinet",
    tableName: "Cabinet",
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: "uuid",
        },
        name: {
            type: "text",
        },
    },
})