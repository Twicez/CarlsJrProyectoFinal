const { Router } = require("express");
const router = new Router();
const TokenManager = require("../libs/utils/token-manager");
const IngredientesController = require("../controllers/ingredientes-controller");
const ingredientesController = new IngredientesController();
const CocinerosController = require("../controllers/cocineros-controller");
const cocinerosController = new CocinerosController();
const MeserosController = require("../controllers/meseros-controller");
const meserosController = new MeserosController();
const AdministradoresController = require("../controllers/administradores-controller");
const administradoresController = new AdministradoresController();
const ProductosController = require("../controllers/productos-controller");
const productosController = new ProductosController();
const OrdenesController = require ("../controllers/ordenes-controller");
const ordenesController = new OrdenesController();
const SuperUsuariosController = require("../controllers/super_usuarios-controller");
const VistaController = require("../controllers/vista-controller");
const superUsuariosController= new SuperUsuariosController();
const vistaController = new VistaController();

router.get("/superusuario/home", TokenManager.validarToken, async (req, res) => {
    await vistaController.paginaHomeSuperUsuario(req, res);
});

router.get("/administrador/home", TokenManager.validarToken, async (req, res) => {
    await vistaController.paginaHomeAdministrador(req, res);
});

router.get("/cocinero/home", TokenManager.validarToken, async (req, res) => {
    await vistaController.paginaHomeCocinero(req, res);
});

router.get("/mesero/home", TokenManager.validarToken, async (req, res) => {
    await vistaController.paginaHomeMesero(req, res);
});

router.get("/login", async (req, res) => {
    await vistaController.paginaLogin(req, res);
});

router.get("/logout", (req, res) => {
    TokenManager.cerrarSesion(res);
});

router.post("/superusuarios-auth", async (req, res) => {
    await superUsuariosController.autenticarSuperUsuario(req, res);
});

router.post("/meseros-auth", async (req, res) => {
    await meserosController.autenticarMesero(req, res);
});

router.post("/administradores-auth", async (req, res) => {
    await administradoresController.autenticarAdministrador(req, res);
});

router.post("/cocineros-auth", async (req, res) => {
    await cocinerosController.autenticarCocinero(req, res);
});

router.get("/ingredientes/:id", TokenManager.validarToken, async (req, res) => {
    await ingredientesController.obtenerPorId(req, res);
});

router.get("/ingredientes", TokenManager.validarToken, async (req, res) => {
    await ingredientesController.obtenerTodos(req, res);
});

router.post("/ingredientes", TokenManager.validarToken, async (req, res) => {
    await ingredientesController.crear(req, res);
});

router.patch("/ingredientes/:id", TokenManager.validarToken, async (req, res) => {
    await ingredientesController.actualizar(req, res);
});

router.delete("/ingredientes/:id", async (req, res) => {
    await ingredientesController.eliminar(req, res);
});

//Direccionamiento entidad cocinero
//Obtener todos los cocineros por id
router.get("/cocineros/:id", TokenManager.validarToken, async (req, res) => {
    await cocinerosController.obtenerPorId(req, res);
});

//Obtener todos los cocineros
router.get("/cocineros", TokenManager.validarToken, async (req, res) => {
    await cocinerosController.obtenerTodos(req, res);
});

//Crear un cocinero
router.post("/cocineros", TokenManager.validarToken, async (req, res) => {
    await cocinerosController.crear(req, res);
});

//Actualizar un cocinero
router.patch("/cocineros/:id", TokenManager.validarToken, async (req, res) => {
    await cocinerosController.actualizar(req, res);
});

//Eliminar un cocinero
router.delete("/cocineros/:id", TokenManager.validarToken, async (req, res) => {
    await cocinerosController.eliminar(req, res);
});

//Direccionamiento entidad mesero
//Obtener todos los meseros por id
router.get("/meseros/:id", TokenManager.validarToken, async (req, res) => {
    await meserosController.obtenerPorId(req, res);
});

//Obtener todos los meseros
router.get("/meseros", TokenManager.validarToken, async (req, res) => {
    await meserosController.obtenerTodos(req, res);
});

//Crear un mesero
router.post("/meseros", TokenManager.validarToken, async (req, res) => {
    await meserosController.crear(req, res);
});

//Actualizar un mesero
router.patch("/meseros/:id", TokenManager.validarToken, async (req, res) => {
    await meserosController.actualizar(req, res);
});

//Eliminar un mesero
router.delete("/meseros/:id", TokenManager.validarToken, async (req, res) => {
    await meserosController.eliminar(req, res);
});

//Direccionamiento entidad administrador
//Obtener todos los administradores por id
router.get("/administradores/:id", TokenManager.validarToken, async (req, res) => {
    await administradoresController.obtenerPorIdAdministradores(req, res);
});
//Obtener todos los administradores
router.get("/administradores", TokenManager.validarToken, async (req, res) => {
    await administradoresController.obtenerTodos(req, res);
});

//Crear un administrador
router.post("/administradores", TokenManager.validarToken, async (req, res) => {
    await administradoresController.crear(req, res);
});

//Actualizar un administrador
router.patch("/administradores/:id", TokenManager.validarToken, async (req, res) => {
    await administradoresController.actualizar(req, res);
});

//Eliminar un administrador
router.delete("/administradores/:id", TokenManager.validarToken, async (req, res) => {
    await administradoresController.eliminar(req, res);
});

//Direccionamiento entidad producto
//Obtener todos los productos por id
router.get("/productos/:id", TokenManager.validarToken, async (req, res) => {
    await productosController.obtenerPorId(req, res);
});
//Obtener todos los productos
router.get("/productos", TokenManager.validarToken, async (req, res) => {
    await productosController.obtenerTodos(req, res);
});
//Crear un producto
router.post("/productos", TokenManager.validarToken, async (req, res) => {
    await productosController.crear(req, res);
});
//Actualizar un producto
router.patch("/productos/:id", TokenManager.validarToken, async (req, res) => {
    await productosController.actualizar(req, res);
});
//Eliminar un producto
router.delete("/productos/:id", TokenManager.validarToken, async (req, res) => {
    await productosController.eliminar(req, res);
});
module.exports = router;

// Obtener una orden por id
router.get("/ordenes/:id", TokenManager.validarToken, async (req, res) => {
    await ordenesController.obtenerPorId(req, res);
});

router.post("/ordenes", TokenManager.validarToken, async (req, res) => {
    await ordenesController.crear(req, res);
});

// Obtener todas las ordenes
router.get("/ordenes", TokenManager.validarToken, async (req, res) => {
    await ordenesController.obtenerTodos(req, res);
});

// Actualizar una orden
router.patch("/ordenes/:id", TokenManager.validarToken, async (req, res) => {
    await ordenesController.actualizar(req, res);
});

// Eliminar una orden
router.delete("/ordenes/:id", TokenManager.validarToken, async (req, res) => {
    await ordenesController.eliminar(req, res);
});

// Obtener un super usuario por id
router.get("/superusuarios/:id", TokenManager.validarToken, async (req, res) => {
    await superUsuariosController.obtenerPorId(req, res);
});

// Obtener todos los super usuarios
router.get("/superusuarios", TokenManager.validarToken, async (req, res) => {
    await superUsuariosController.obtenerTodos(req, res);
});

router.post("/superusuarios", TokenManager.validarToken, async (req, res) => {
    await superUsuariosController.crear(req, res);
});

// Actualizar un super usuario
router.patch("/superusuarios/:id", TokenManager.validarToken, async (req, res) => {
    await superUsuariosController.actualizar(req, res);
});

// Eliminar un super usuario
router.delete("/superusuarios/:id", TokenManager.validarToken, async (req, res) => {
    await superUsuariosController.eliminar(req, res);
});
