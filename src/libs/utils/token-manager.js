require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

class TokenManager {
    static async generarTokenDeAcceso(contrasenia) {
        return jwt.sign({ contrasenia }, process.env.SECRET, { expiresIn: '5m' });
    }

    static async establecerCookie(res, tokenDeAcceso) {
        res.setHeader('Set-Cookie', cookie.serialize('token', tokenDeAcceso, {
            httpOnly: true,
            maxAge: 30000,
            path: '/'
        }));
    }

    static async validarToken(req, res, next) {
        const tokenDeAcceso = req.headers["authorization"] || req.cookies['token'];
        if (!tokenDeAcceso) {
            return res.redirect("/login");
        }
        jwt.verify(tokenDeAcceso, process.env.SECRET, (err, usuario) => {
            if (err) {
                return res.redirect("/login"); 
            } else {
                next();
            }
        });
    }

    static async cerrarSesion(res) {
        res.clearCookie('token');
        res.redirect("/login");
    }
}

module.exports = TokenManager;