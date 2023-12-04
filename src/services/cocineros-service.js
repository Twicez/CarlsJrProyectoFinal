const dataSource = require("../libs/bd_config");
const Cocinero = require("../models/cocinero");

class CocinerosService {
    constructor(){
        this.cocineroRepository = dataSource.getRepository("Cocinero");
    }

    async obtenerPorId(id) {
        return await this.cocineroRepository.findOne({
            where: { id }
        });
    }
  
    async obtenerTodos() {
        return await this.cocineroRepository.find({
            select: ["id", "nombreUsuario", "puesto", "contrasenia"]
        });
    }
   
    async crear(cocinero) {
        if (!cocinero) {
            throw Error("No se puede agregar un cocinero");
        }
        if (!cocinero.nombreUsuario) {
            throw Error("No se puede crear un cocinero sin un nombre");
        }

        if (!cocinero.contrasenia) {
            throw Error("No se puede crear un cocinero sin una contraseña");
        }

        const nuevoCocinero = new Cocinero();
        Object.assign(nuevoCocinero, cocinero);

        return await this.cocineroRepository.save(nuevoCocinero);
    }
   
    async actualizar(id, nuevoCocinero) {
        const cocineroGuardado = await this.obtenerPorId(id);

        if (!cocineroGuardado) {
            throw Error("No existe el cocinero a actualizar");
        }

        Object.assign(cocineroGuardado, nuevoCocinero);

        return await this.cocineroRepository.save(cocineroGuardado);
    }
  
    async eliminar(id) {
        const cocineroGuardado = await this.obtenerPorId(id);

        if (!cocineroGuardado) {
            throw Error("No existe el cocinero a eliminar");
        }

        return await this.cocineroRepository.remove(cocineroGuardado);
    }

    async autenticarCocinero(cocinero) {
        return await this.cocineroRepository.findOne({
            where: {
                nombreUsuario: cocinero.nombreUsuario,
                contrasenia: cocinero.contrasenia
            }
        });
    }
}

module.exports = CocinerosService;
