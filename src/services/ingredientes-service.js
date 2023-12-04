const dataSource = require("../libs/bd_config");
const Ingrediente = require("../models/ingrediente");

class IngredientesService {
    constructor() {
        this.ingredienteRepository = dataSource.getRepository("Ingrediente");
    }

    async obtenerPorId(id) {
        return await this.ingredienteRepository.findOne({
            where: { id }
        });
    }

    async obtenerTodos() {
        return await this.ingredienteRepository.find({
            select: ["id", "nombreIngrediente", "cantidad"]
        });
    }

    async crear(ingrediente) {
        if (!ingrediente) {
            throw Error("No se puede agregar un ingrediente");
        }

        if (!ingrediente.nombreIngrediente) {
            throw Error("No se puede crear un ingrediente sin un nombre");
        }

        if (!ingrediente.cantidad) {
            throw Error("No se puede crear un ingrediente sin una cantidad");
        }

        const nuevoIngrediente = new Ingrediente();
        Object.assign(nuevoIngrediente, ingrediente);

        return await this.ingredienteRepository.save(nuevoIngrediente);
    }

    async actualizar(id, nuevoIngrediente) {
        const ingredienteGuardado = await this.obtenerPorId(id);

        if (!ingredienteGuardado) {
            throw Error("No existe el ingrediente a actualizar");
        }

        Object.assign(ingredienteGuardado, nuevoIngrediente);

        return await this.ingredienteRepository.save(ingredienteGuardado);
    }

    async eliminar(id) {
        const ingredienteGuardado = await this.obtenerPorId(id);

        if (!ingredienteGuardado) {
            throw Error("No existe el ingrediente a eliminar");
        }

        return await this.ingredienteRepository.remove(ingredienteGuardado);
    }
}

module.exports = IngredientesService;