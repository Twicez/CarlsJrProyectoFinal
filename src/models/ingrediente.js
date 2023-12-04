class Ingrediente {
    constructor(id, nombreIngrediente, cantidad, productoId) {
        this.id = id;
        this.nombreIngrediente = nombreIngrediente;
        this.cantidad = cantidad;
        this.productoId = productoId;
    }
}

module.exports = Ingrediente;