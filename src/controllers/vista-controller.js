const path = require("path");

class VistaController {
    constructor() {
    }

    async paginaHomeSuperUsuario(req, res) {
        return res.sendFile(path.join(__dirname, "../pages", "home-super-usuario.html"));
    }
    
    async paginaHomeAdministrador(req, res) {
        return res.sendFile(path.join(__dirname, "../pages", "home-administrador.html"));
    }

    async paginaHomeCocinero(req, res) {
        return res.sendFile(path.join(__dirname, "../pages", "home-cocinero.html"));
    }
    
    async paginaHomeMesero(req, res) {
        return res.sendFile(path.join(__dirname, "../pages", "home-mesero.html"));
    }

    async paginaLogin(req, res) {
        return await res.sendFile(path.join(__dirname, "../pages", "login.html"));
    }
}

module.exports = VistaController;