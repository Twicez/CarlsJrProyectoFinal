const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Ingrediente",
    tableName: "ingredientes",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombreIngrediente: {
            type: "varchar",
            length: 50,
            nullable: false
        },
        cantidad: {
            type: "int",
            nullable: false
        }
    }
});
