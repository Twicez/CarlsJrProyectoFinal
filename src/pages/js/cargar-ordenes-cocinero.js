const obtenerOrdenes = async () => {
    const opciones = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    const ordenes = [];
    try {
        const response = await fetch("/ordenes", opciones);
        if (response.ok) {
            const todasLasOrdenes = await response.json();
            console.table(todasLasOrdenes);
            todasLasOrdenes.forEach(orden => {
                if (orden.estatus === "En proceso") {
                    ordenes.push(orden);
                }
            });
            return ordenes;
        }
    } catch (e) {
        console.log(e);
    }
}

const finalizarOrden = async (orden) => {
    const ordenActualizada = {
        estatus: "Preparada"
    }
    const opciones = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ordenActualizada)
    }
    try {
        const response = await fetch(`/ordenes/${orden.id}`, opciones);
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        console.log(e);
    }
}

const tablaOrdenesBody = document.getElementById("tabla-ordenes-body");

const agregarFilaOrden = (orden) => {
    const fila = document.createElement("tr");
    fila.dataset.idOrden = orden.id;
    const columnaNumeroOrden = document.createElement("td");
    columnaNumeroOrden.textContent = orden.id;
    fila.appendChild(columnaNumeroOrden);
    const columnaProductos = document.createElement("td");
    if (orden.productos.length > 0) {
        const nombreProductos = orden.productos.map(producto => producto.nombreProducto);
        columnaProductos.textContent = nombreProductos.join(", ");
    } else {
        columnaProductos.textContent = "N/A";
    }
    fila.appendChild(columnaProductos);
    const columnaAcciones = document.createElement("td");
    const botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "btn btn-success btn-editar";
    botonEditar.innerHTML = '<i class="fa-solid fa-check"></i>';
    botonEditar.dataset.idOrden = orden.id;
    botonEditar.addEventListener("click", () => mostrarConfirmarFinalizarModal(orden));
    columnaAcciones.appendChild(botonEditar);
    fila.appendChild(columnaAcciones);
    tablaOrdenesBody.appendChild(fila);
}

const mostrarConfirmarFinalizarModal = (orden) => {
    const myModal = new bootstrap.Modal(document.getElementById('confirmar-finalizar-modal'));
    const confirmarEliminarBtn = document.getElementById('confirmar-finalizar-btn');
    confirmarEliminarBtn.addEventListener('click', async () => {
        await finalizarOrden(orden);
        eliminarFilaOrden(orden.id);
        myModal.hide();
    });
    const cancelarEliminarBtn = document.getElementById('cancelar-finalizar-btn');
    cancelarEliminarBtn.addEventListener('click', () => {
        myModal.hide();
    });
    myModal.show();
}

const cargarOrdenesTabla = async (ordenes) => {
    ordenes.forEach((orden) => {
        agregarFilaOrden(orden);
    });
}

const eliminarFilaOrden = (idOrden) => {
    const filaProducto = document.querySelector(`tr[data-id-orden="${idOrden}"]`);
    if (filaProducto) {
        filaProducto.remove();
    } else {
        console.error("Error: No se encontró la fila de la orden para eliminar.");
    }
};

window.addEventListener("DOMContentLoaded", async () => {
    const ordenes = await obtenerOrdenes();
    cargarOrdenesTabla(ordenes);
})