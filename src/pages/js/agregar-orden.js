const alert = document.getElementById("alert");
const message = document.getElementById("message");
const modalConfirmar = document.getElementById("confirmar-crear-orden-modal");

const mostrarConfirmarCrearOrdenModal = (orden) => {
    const myModal = new bootstrap.Modal(modalConfirmar);
    const confirmarCrearOrdenBtn = document.getElementById('confirmar-crear-orden-btn');
    const campoTotal = document.getElementById("campo-total");
    campoTotal.innerHTML = `<p><b>Total:</b> $${orden.total}</p>`;
    confirmarCrearOrdenBtn.addEventListener('click', async () => {
        const ordenGuardada = await agregarOrden(orden);
        agregarFilaOrden(ordenGuardada);
        ocultarAlertas();
        mostrarMensajeExito("Se ha creado la órden satisfactoriamente.");
        myModal.hide();
    });
    const cancelarCrearOrdenrBtn = document.getElementById('cancelar-craer-orden-btn');
    cancelarCrearOrdenrBtn.addEventListener('click', () => {
        myModal.hide();
    });
    myModal.show();
}


const mostrarAlerta = (mensaje) => {
    alert.innerText = mensaje;
    alert.classList.remove("visually-hidden");
}

const mostrarMensajeExito = (mensaje) => {
    message.innerText = mensaje;
    message.classList.remove("visually-hidden");
}

const ocultarAlertas = () => {
    alert.classList.add("visually-hidden");
    message.classList.add("visually-hidden");
}

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
                if (orden.estatus !== "Finalizada") {
                    ordenes.push(orden);
                }
            });
            return ordenes;
        }
    } catch (e) {
        console.log(e);
    }
}

const obtenerProductos = async () => {
    const opciones = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const response = await fetch("/productos", opciones);
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        console.log(e);
        return [];
    }
}

const llenarOpcionesProductos = async () => {
    const selectProductos = document.getElementById('productos');
    const productos = await obtenerProductos();
    selectProductos.innerHTML = '';
    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.nombreProducto;
        option.textContent = `${producto.nombreProducto} - ${producto.costo}`;
        option.dataset.id = producto.id;
        option.dataset.costo = producto.costo;
        selectProductos.appendChild(option);
    });
}


const obtenerDatosOrden = () => {
    const nombreCliente = document.getElementById("nombreCliente").value;
    const numeroTelefono = document.getElementById("numeroTelefono").value;
    const productosOrden = document.getElementById("productos");
    const productos = [];
    for (let i = 0; i < productosOrden.options.length; i++) {
        if (productosOrden.options[i].selected) {
            const idProducto = productosOrden.options[i].dataset.id;
            const costoProducto = parseFloat(productosOrden.options[i].dataset.costo); // Recuperar el costo como número
            productos.push({
                id: idProducto,
                nombreProducto: productosOrden.options[i].value,
                costo: costoProducto
            });
        }
    }
    if (!nombreCliente || !numeroTelefono) {
        ocultarAlertas();
        mostrarAlerta("Favor de nombre o número de teléfono");
        return;
    }
    if (!productos.length > 0) {
        ocultarAlertas();
        mostrarAlerta("Favor de agregar ingredientes");
        return;
    }
    let total = 0;
    for (let i = 0; i < productos.length; i++) {
        total += productos[i].costo;
    }
    return {
        nombreCliente,
        numeroTelefono,
        productos,
        total,
        estatus: "En proceso"
    };
}

const agregarOrden = async (orden) => {
    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orden)
    };
    try {
        const response = await fetch("/ordenes", opciones);
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        console.log(e);
    }
}

const finalizarOrden = async (orden) => {
    const ordenActualizada = {
        estatus: "Finalizada"
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

const tablaOrdenesBody = document.getElementById("tabla-ordenes-body");

const agregarFilaOrden = (orden) => {
    const fila = document.createElement("tr");
    fila.dataset.idOrden = orden.id;
    const columnaNumeroOrden = document.createElement("td");
    columnaNumeroOrden.textContent = orden.id;
    fila.appendChild(columnaNumeroOrden);
    const columnaNombre = document.createElement("td");
    columnaNombre.textContent = orden.nombreCliente;
    fila.appendChild(columnaNombre);
    const columnaTelefono = document.createElement("td");
    columnaTelefono.textContent = orden.numeroTelefono;
    fila.appendChild(columnaTelefono);
    const columnaProductos = document.createElement("td");
    if (orden.productos.length > 0) {
        const nombreProductos = orden.productos.map(producto => producto.nombreProducto);
        columnaProductos.textContent = nombreProductos.join(", ");
    } else {
        columnaProductos.textContent = "N/A";
    }
    fila.appendChild(columnaProductos);
    const columnaTotal = document.createElement("td");
    columnaTotal.innerText = "$" + orden.total;
    fila.appendChild(columnaTotal);
    const columnaEstatus = document.createElement("td");
    columnaEstatus.innerText = orden.estatus;
    fila.appendChild(columnaEstatus);
    const columnaAcciones = document.createElement("td");
    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.className = "btn btn-danger btn-eliminar";
    botonEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>';
    botonEliminar.dataset.idOrden = orden.id;
    botonEliminar.addEventListener("click", () => mostrarConfirmarEliminarModal(orden.id));
    const botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "btn btn-success btn-editar";
    botonEditar.innerHTML = '<i class="fa-solid fa-check"></i>';
    botonEditar.dataset.idOrden = orden.id;
    botonEditar.addEventListener("click", () => mostrarConfirmarFinalizarModal(orden));
    columnaAcciones.appendChild(botonEditar);
    columnaAcciones.appendChild(botonEliminar);
    columnaAcciones.appendChild(botonEditar);
    fila.appendChild(columnaAcciones);
    tablaOrdenesBody.appendChild(fila);
}

const agregarOrdenBtn = document.getElementById("agregar-orden-btn");

agregarOrdenBtn.addEventListener("click", async () => {
    const orden = obtenerDatosOrden();
    if (orden) {
        await mostrarConfirmarCrearOrdenModal(orden);
    }
});

const cargarOrdenesTabla = async (ordenes) => {
    ordenes.forEach((orden) => {
        agregarFilaOrden(orden);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    llenarOpcionesProductos();
    const ordenes = await obtenerOrdenes();
    await cargarOrdenesTabla(ordenes);
});