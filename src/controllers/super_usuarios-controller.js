const SuperUsuario = require("../models/superUsuario");
const TokenManager = require("../libs/utils/token-manager");
const SuperUsuarioService = require("../services/super_usuarios-service");

class SuperUsuariosController {
    constructor() {
        this.superUsuariosService = new SuperUsuarioService();
    }

    async obtenerPorId(req, res) {
        try {
            const id = req.params.id;
            const superUsuario = await this.superUsuariosService.obtenerPorId(id);
            res.status(200).json(superUsuario);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async obtenerTodos(req, res) {
        try {
            const superUsuarios = await this.superUsuariosService.obtenerTodos();
            res.status(200).json(superUsuarios);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async crear(req, res) {
        try {
            const superUsuario = req.body;
            const nuevoSuperUsuario = await this.superUsuariosService.crear(superUsuario);
            res.status(201).json(nuevoSuperUsuario);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async actualizar(req, res) {
        try {
            const id = req.params.id;
            const nuevoSuperUsuario = req.body;
            const superUsuarioActualizado = await this.superUsuariosService.actualizar(id, nuevoSuperUsuario);
            res.status(200).json(superUsuarioActualizado);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async eliminar(req, res) {
        try {
            const id = req.params.id;
            await this.superUsuariosService.eliminar(id);
            res.status(200).json({ message: "Super Usuario eliminado correctamente" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async autenticarSuperUsuario(req, res) {
        try {
            const { correo, contrasenia } = req.body;
            const superUsuario = new SuperUsuario();
            superUsuario.correo = correo;
            superUsuario.contrasenia = contrasenia;
            const superUsuarioAutenticado = await this.superUsuariosService.autenticarSuperUsuario(superUsuario);
            if (!superUsuarioAutenticado) {
                return res.status(401).json({
                    message: "No fue posible autenticare"
                });
            }
            const tokenDeAcceso = await TokenManager.generarTokenDeAcceso(superUsuarioAutenticado.contrasenia);
            TokenManager.establecerCookie(res, tokenDeAcceso);
            return res.json({ usuario: superUsuarioAutenticado, tokenDeAcceso });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = SuperUsuariosController;