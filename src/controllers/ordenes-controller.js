const OrdenesService = require("../services/ordenes-service");

class OrdenesController {
    constructor() {
        this.ordenesService = new OrdenesService();
    }

    async obtenerPorId(req, res) {
        try {
            const id = req.params.id;
            const orden = await this.ordenesService.obtenerPorId(id);
            res.status(200).json(orden);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async obtenerTodos(req, res) {
        try {
            const ordenes = await this.ordenesService.obtenerTodos();
            res.status(200).json(ordenes);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async crear(req, res) {
        try {
            const orden = req.body;
            const nuevaOrden = await this.ordenesService.crear(orden);
            res.status(201).json(nuevaOrden);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async actualizar(req, res) {
        try {
            const id = req.params.id;
            const nuevaOrden = req.body;
            const ordenActualizada = await this.ordenesService.actualizar(id, nuevaOrden);
            res.status(200).json(ordenActualizada);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async eliminar(req, res) {
        try {
            const id = req.params.id;
            await this.ordenesService.eliminar(id);
            res.status(200).json({ message: "Orden eliminada correctamente" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = OrdenesController;