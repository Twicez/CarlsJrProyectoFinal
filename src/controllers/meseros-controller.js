const TokenManager = require("../libs/utils/token-manager");
const Mesero = require("../models/mesero");
const MeserosService = require("../services/meseros-service");

class MeserosController {
    constructor() {
        this.meserosService = new MeserosService();
    }

    async obtenerPorId(req, res) {
        try {
            const id = req.params.id;
            const mesero = await this.meserosService.obtenerPorId(id);
            res.status(200).json(mesero);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async obtenerTodos(req, res) {
        try {
            const meseros = await this.meserosService.obtenerTodos();
            res.status(200).json(meseros);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async crear(req, res) {
        try {
            const mesero = req.body;
            const nuevoMesero = await this.meserosService.crear(mesero);
            res.status(201).json(nuevoMesero);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async actualizar(req, res) {
        try {
            const id = req.params.id;
            const meseroActualizado = await this.meserosService.actualizar(id, req.body);
            res.status(201).json(meseroActualizado);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async eliminar(req, res) {
        try {
            const id = req.params.id;
            const meseroEliminado = await this.meserosService.eliminar(id);
            res.status(201).json(meseroEliminado);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async autenticarMesero(req, res) {
        try {
            const { nombreUsuario, contrasenia } = req.body;
            const mesero = new Mesero();
            mesero.nombreUsuario = nombreUsuario;
            mesero.contrasenia = contrasenia;
            const meseroAutenticado = await this.meserosService.autenticarMesero(mesero);
            if (!meseroAutenticado) {
                return res.status(401).json({
                    message: "No fue posible autenticare"
                });
            }
            const tokenDeAcceso = await TokenManager.generarTokenDeAcceso(meseroAutenticado.contrasenia);
            TokenManager.establecerCookie(res, tokenDeAcceso);
            return res.json({ usuario: meseroAutenticado, tokenDeAcceso });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = MeserosController;
