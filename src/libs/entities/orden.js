const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Orden",
    tableName: "ordenes",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombreCliente: {
            type: "varchar",
            length: 50,
            nullable: false
        },
        numeroTelefono: {
            type: "varchar",
            length: 10,
            nullable: false
        },
        total: {
            type: "int",
            nullable: false
        },
        estatus: {
            type: "varchar",
            length: 25,
            nullable: false
        }
    },
    relations: {
        productos: {
            type: "many-to-many",
            target: "Producto",
            joinTable: {
                name: "ordenes_productos",
                joinColumn: {
                    name: "orderId",
                    referencedColumnName: "id"
                },
                inverseJoinColumn: {
                    name: "productoId",
                    referencedColumnName: "id"
                }
            }
        },
        mesero: {
            type: "many-to-one",
            target: "Mesero"
        },
        cocinero: {
            type: "many-to-one",
            target: "Cocinero"
        }
    }
});