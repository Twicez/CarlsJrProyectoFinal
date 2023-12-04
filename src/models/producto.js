class Producto{
    constructor(id, nombreProducto, costo, ingredientes, idOrden, idAdministrador) {
        this.id = id;
        this.nombreProducto = nombreProducto;
        this.costo = costo;
        this.ingredientes = ingredientes;
        this.idOrden = idOrden;
        this.idAdministrador = idAdministrador;
    }
}
   module.exports = Producto;