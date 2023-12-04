const tablaProductosBody = document.getElementById("tabla-productos-body");

const llenarTablaProductos = (productos) => {
    tablaProductosBody.innerHTML = "";
    productos.forEach(producto => {
        const fila = document.createElement("tr");
        fila.dataset.idProducto = producto.id;
        const columnaNombre = document.createElement("td");
        columnaNombre.textContent = producto.nombreProducto;
        fila.appendChild(columnaNombre);
        const columnaCosto = document.createElement("td");
        columnaCosto.textContent = "$" + producto.costo;
        fila.appendChild(columnaCosto);
        const columnaIngredientes = document.createElement("td");
        if (producto.ingredientes.length > 0) {
            const nombresIngredientes = producto.ingredientes.map(ingrediente => ingrediente.nombreIngrediente);
            columnaIngredientes.textContent = nombresIngredientes.join(", ");
        } else {
            columnaIngredientes.textContent = "N/A";
        }
        fila.appendChild(columnaIngredientes);
        const columnaAcciones = document.createElement("td");
        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "btn btn-danger btn-eliminar";
        botonEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>';
        botonEliminar.dataset.idProducto = producto.id;
        botonEliminar.addEventListener("click", () => mostrarConfirmarEliminarModal(producto.id));

        columnaAcciones.appendChild(botonEliminar);
        fila.appendChild(columnaAcciones);
        tablaProductosBody.appendChild(fila);
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    const productos = await obtenerProductos();
    console.table(productos);
    llenarTablaProductos(productos);
});
