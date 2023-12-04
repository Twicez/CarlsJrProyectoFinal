const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Producto",
    tableName: "productos",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombreProducto: {
            type: "varchar",
            length: 50,
            nullable: false
        },
        costo: {
            type: "int",
            nullable: false
        }
    },
    relations: {
        ingredientes: {
            type: "many-to-many",
            target: "Ingrediente",
            joinTable: {
                name: "productos_ingredientes",
                joinColumn: {
                    name: "productoId",
                    referencedColumnName: "id"
                },
                inverseJoinColumn: {
                    name: "ingredienteId",
                    referencedColumnName: "id"
                }
            }
        },
        administrador: {
            type: "many-to-one",
            target: "Administrador"
        }
    }
});
