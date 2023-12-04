const IngredientesService = require("../services/ingredientes-service");

class IngredientesController {
    constructor() {
        this.ingredientesService = new IngredientesService();
    }

    async obtenerPorId(req, res) {
        try {
            const id = req.params.id;
            const ingrediente = await this.ingredientesService.obtenerPorId(id);
            res.status(200).json(ingrediente);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async obtenerTodos(req, res) {
        try {
            const ingredientes = await this.ingredientesService.obtenerTodos();
            res.status(200).json(ingredientes);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async crear(req, res) {
        try {
            const ingrediente = req.body;
            const nuevoIngrediente = await this.ingredientesService.crear(ingrediente);
            res.status(201).json(nuevoIngrediente);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async actualizar(req, res) {
        try {
            const id = req.params.id;
            const ingredienteActualizado = await this.ingredientesService.actualizar(id, req.body);
            res.status(201).json(ingredienteActualizado);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async eliminar(req, res) {
        try {
            const id = req.params.id;
            const ingredienteEliminado = await this.ingredientesService.eliminar(id);
            res.status(201).json(ingredienteEliminado);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = IngredientesController;