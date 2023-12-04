
const dataSource = require("../libs/bd_config");
const Orden = require("../models/orden");

class OrdenesService {
    constructor(){
        this.ordenRepository = dataSource.getRepository("Orden");
    }

    async obtenerPorId(id) {
        return await this.ordenRepository.findOne({
            where: { id }
        });
    }

    async obtenerTodos() {
        return await this.ordenRepository.find({
            select: ["id", "nombreCliente", "numeroTelefono", "total", "estatus"],
            relations: {
                productos: true
            }
        });
    }

    async crear(orden) {
        if (!orden) {
            throw Error("No se puede agregar una orden");
        }

        if (!orden.nombreCliente || !orden.numeroTelefono || !orden.productos) {
            throw Error("Error: campos vacíos");
        }

        const nuevaOrden = new Orden();
        Object.assign(nuevaOrden, orden);

        return await this.ordenRepository.save(nuevaOrden);
    }

    async actualizar(id, nuevaOrden) {
        const ordenGuardada = await this.obtenerPorId(id);

        if (!ordenGuardada) {
            throw Error("No existe la orden a actualizar");
        }

        Object.assign(ordenGuardada, nuevaOrden);

        return await this.ordenRepository.save(ordenGuardada);
    }

    async eliminar(id) {
        const ordenGuardada = await this.obtenerPorId(id);

        if (!ordenGuardada) {
            throw Error("No existe la orden a eliminar");
        }

        return await this.ordenRepository.remove(ordenGuardada);
    }
}

module.exports = OrdenesService;