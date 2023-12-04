const dataSource = require("../libs/bd_config");
const SuperUsuario = require("../models/superUsuario");

class SuperUsuariosService {
    constructor() {
        this.superUsuarioRepository = dataSource.getRepository("SuperUsuario");
    }

    async obtenerPorId(id) {
        return await this.superUsuarioRepository.findOne({
            where: { id }
        });
    }

    async obtenerTodos() {
        return await this.superUsuarioRepository.find({
            select: ["id", "nombreUsuario", "correo", "contrasenia"]
        });
    }

    async crear(superUsuario) {
        if (!superUsuario) {
            throw Error("No se puede agregar un super usuario");
        }
        if (!superUsuario.nombreUsuario) {
            throw Error("No se puede crear un super usuario sin un nombre de usuario");
        }

        if (!superUsuario.correo) {
            throw Error("No se puede crear un super usuario sin un correo");
        }

        if (!superUsuario.contrasenia) {
            throw Error("No se puede crear un super usuario sin una contraseña");
        }

        const nuevoSuperUsuario = new SuperUsuario();
        Object.assign(nuevoSuperUsuario, superUsuario);

        return await this.superUsuarioRepository.save(nuevoSuperUsuario);
    }

    async actualizar(id, nuevoSuperUsuario) {
        const superUsuarioGuardado = await this.obtenerPorId(id);

        if (!superUsuarioGuardado) {
            throw Error("No existe el super usuario a actualizar");
        }

        Object.assign(superUsuarioGuardado, nuevoSuperUsuario);

        return await this.superUsuarioRepository.save(superUsuarioGuardado);
    }

    async eliminar(id) {
        const superUsuarioGuardado = await this.obtenerPorId(id);

        if (!superUsuarioGuardado) {
            throw Error("No existe el super usuario a eliminar");
        }

        return await this.superUsuarioRepository.remove(superUsuarioGuardado);
    }

    async autenticarSuperUsuario(superUsuario) {
        return await this.superUsuarioRepository.findOne({
            where: {
                correo: superUsuario.correo,
                contrasenia: superUsuario.contrasenia
            }
        });
    }

    async obtenerSuperUsuarioPorCorreo(correo) {
        return await this.superUsuarioRepository.findOne({
            where: {
                correo
            }
        });
    }
}

module.exports = SuperUsuariosService;