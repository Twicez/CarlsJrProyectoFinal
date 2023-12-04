const dataSource = require("../libs/bd_config");
const Producto = require("../models/producto");

class ProductosService{
    constructor() {
        this.productoRepository = dataSource.getRepository("Producto");
    }

    async obtenerPorId(id) {
        return await this.productoRepository.findOne({
            where: { id }
        });
    }

    async obtenerTodos() {
        return await this.productoRepository.find({
            select: ["id", "nombreProducto", "costo"],
            relations: {
                ingredientes: true
            }
        });
    }

    async crear(producto) {
        if (!producto) {
            throw Error("No se puede agregar un producto");
        }
        if (!producto.nombreProducto) {
            throw Error("No se puede crear un producto sin un nombre");
        }

        const nuevoProducto = new Producto();
        Object.assign(nuevoProducto, producto);

        return await this.productoRepository.save(nuevoProducto);
    }

    async actualizar(id, nuevoProducto) {
        const productoGuardado = await this.obtenerPorId(id);

        if (!productoGuardado) {
            throw Error("No existe el producto a actualizar");
        }

        Object.assign(productoGuardado, nuevoProducto);

        return await this.productoRepository.save(productoGuardado);
    }

    async eliminar(id) {
        const productoGuardado = await this.obtenerPorId(id);

        if (!productoGuardado) {
            throw Error("No existe el producto a eliminar");
        }

        return await this.productoRepository.remove(productoGuardado);
    }
}

module.exports= ProductosService;