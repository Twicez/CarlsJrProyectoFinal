const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "SuperUsuario",
    tableName: "super_usuarios",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        correo: {
            type: "varchar",
            length: 100,
            nullable: false
        },
        nombreUsuario: {
            type: "varchar",
            length: 30,
            nullable: false
        },
        contrasenia: {
            type: "varchar",
            length: 50,
            nullable: false
        }
    },
    relations: {
        meseros: {
            type: "one-to-many",
            target: "Mesero",
            inverseSide: "superUsuario"
        },
        cocineros: {
            type: "one-to-many",
            target: "Cocinero",
            inverseSide: "superUsuario"
        },
        administradores: {
            type: "one-to-many",
            target: "Administrador",
            inverseSide: "superUsuario"
        }
    }
});