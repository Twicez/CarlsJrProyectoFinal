const TokenManager = require("../libs/utils/token-manager");
const Administrador = require("../models/administrador");
const AdministradoresService = require("../services/administradores-service");

class AdministradoresController {
    constructor() {
        this.administradoresService = new AdministradoresService();
    }

    async obtenerPorIdAdministradores(req, res) {
        try {
            const id = req.params.id;
            const administrador = await this.administradoresService.obtenerPorId(id);
            res.status(200).json(administrador);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async obtenerTodos(req, res) {
        try {
            const administradores = await this.administradoresService.obtenerTodos();
            res.status(200).json(administradores);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async crear(req, res) {
        try {
            const administrador = req.body;
            const nuevoAdministrador = await this.administradoresService.crear(administrador);
            res.status(201).json(nuevoAdministrador);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    
    async actualizar(req, res) {
        try {
            const id = req.params.id;
            const administradorActualizado = await this.administradoresService.actualizar(id, req.body);
            res.status(201).json(administradorActualizado);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async eliminar(req, res) {
        try {
            const id = req.params.id;
            const administradorEliminado = await this.administradoresService.eliminar(id);
            res.status(201).json(administradorEliminado);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async autenticarAdministrador(req, res) {
        try {
            const { nombreUsuario, contrasenia } = req.body;
            const administrador = new Administrador();
            administrador.nombreUsuario = nombreUsuario;
            administrador.contrasenia = contrasenia;
            const administradorAutenticado = await this.administradoresService.autenticarAdministrador(administrador);
            if (!administradorAutenticado) {
                return res.status(401).json({
                    message: "No fue posible autenticare"
                });
            }
            const tokenDeAcceso = await TokenManager.generarTokenDeAcceso(administradorAutenticado.contrasenia);
            TokenManager.establecerCookie(res, tokenDeAcceso);
            return res.json({ usuario: administradorAutenticado, tokenDeAcceso });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = AdministradoresController;
