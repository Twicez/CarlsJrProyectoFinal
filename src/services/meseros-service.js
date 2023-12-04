const dataSource = require("../libs/bd_config");
const Mesero = require("../models/mesero");

class MeserosService{
    constructor(){
        this.meseroRepository = dataSource.getRepository("Mesero");
    }

    async obtenerPorId(id) {
        return await this.meseroRepository.findOne({
            where: { id }
        });
    }

    async obtenerTodos() {
        return await this.meseroRepository.find({
            select: ["id", "nombreUsuario", "puesto", "contrasenia"]
        });
    }

    async crear(mesero) {
        if (!mesero) {
            throw Error("No se puede agregar un mesero");
        }
        if (!mesero.nombreUsuario) {
            throw Error("No se puede crear un mesero sin un nombre");
        }

        if (!mesero.contrasenia) {
            throw Error("No se puede crear un mesero sin una contraseña");
        }

        const nuevoMesero = new Mesero();
        Object.assign(nuevoMesero, mesero);

        return await this.meseroRepository.save(nuevoMesero);
    }

    async actualizar(id, nuevoMesero) {
        const meseroGuardado = await this.obtenerPorId(id);

        if (!meseroGuardado) {
            throw Error("No existe el mesero a actualizar");
        }

        Object.assign(meseroGuardado, nuevoMesero);

        return await this.meseroRepository.save(meseroGuardado);
    }

    async eliminar(id) {
        const meseroGuardado = await this.obtenerPorId(id);

        if (!meseroGuardado) {
            throw Error("No existe el mesero a eliminar");
        }

        return await this.meseroRepository.remove(meseroGuardado);
    }

    async autenticarMesero(mesero) {
        return await this.meseroRepository.findOne({
            where: {
                nombreUsuario: mesero.nombreUsuario,
                contrasenia: mesero.contrasenia
            }
        });
    }
}

module.exports = MeserosService;
