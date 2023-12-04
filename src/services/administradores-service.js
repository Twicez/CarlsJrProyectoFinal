const TokenManager = require("../libs/utils/token-manager");
const dataSource = require("../libs/bd_config");
const Administrador = require("../models/administrador");

class AdministradoresService{
    constructor() {
        this.administradorRepository = dataSource.getRepository("Administrador");
    }

      async obtenerPorId(id) {
        return await this.administradorRepository.findOne({
            where: { id }
        });
    }

    async obtenerTodos() {
        return await this.administradorRepository.find({
            select: ["id", "nombreUsuario", "puesto", "contrasenia"]
        });
    }

    async crear(administrador) {
        if (!administrador) {
            throw Error("No se puede agregar un administrador");
        }
        if (!administrador.nombreUsuario) {
            throw Error("No se puede crear un administrador sin un nombre");
        }

        if (!administrador.contrasenia) {
            throw Error("No se puede crear un administrador sin una contraseña");
        }

        const nuevoAdministrador = new Administrador();
        Object.assign(nuevoAdministrador, administrador);

        return await this.administradorRepository.save(nuevoAdministrador);
    }

    async actualizar(id, nuevoAdministrador) {
        const administradorGuardado = await this.obtenerPorId(id);

        if (!administradorGuardado) {
            throw Error("No existe el administrador a actualizar");
        }

        Object.assign(administradorGuardado, nuevoAdministrador);

        return await this.administradorRepository.save(administradorGuardado);
    }

    async eliminar(id) {
        const administradorGuardado = await this.obtenerPorId(id);

        if (!administradorGuardado) {
            throw Error("No existe el administrador a eliminar");
        }

        return await this.administradorRepository.remove(administradorGuardado);
    }

    async autenticarAdministrador(administrador) {
        return await this.administradorRepository.findOne({
            where: {
                nombreUsuario: administrador.nombreUsuario,
                contrasenia: administrador.contrasenia
            }
        });
    }
}

module.exports= AdministradoresService;
