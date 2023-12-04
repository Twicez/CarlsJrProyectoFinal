const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Administrador",
    tableName: "administradores",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombreUsuario: {
            type: "varchar",
            length: 30,
            nullable: false
        },
        puesto: {
            type: "varchar",
            length: 20,
            nullable: false
        },
        contrasenia: {
            type: "varchar",
            length: 50,
            nullable: false
        }
    },
    relations: {
        productos: {
            type: "one-to-many",
            target: "Producto",
            inverseSide: "administrador"
        },
        superUsuario: {
            type: "many-to-one",
            target: "SuperUsuario"
        }
    }
});