const eliminarFilaProducto = (idProducto) => {
    const filaProducto = document.querySelector(`tr[data-id-producto="${idProducto}"]`);
    if (filaProducto) {
        filaProducto.remove();
    } else {
        console.error("Error: No se encontró la fila del producto para eliminar.");
    }
};

const eliminarProducto = async (idProducto) => {
    const opciones = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const response = await fetch(`/productos/${idProducto}`, opciones);
        if (response.ok) {
            console.log(await response.json());
            eliminarFilaOrden(idProducto);
        }
    } catch (e) {
        console.log(e);
    }
}

const mostrarConfirmarEliminarModal = (id) => {
    const myModal = new bootstrap.Modal(document.getElementById('confirmar-eliminar-modal'));
    const confirmarEliminarBtn = document.getElementById('confirmar-eliminar-btn');
    confirmarEliminarBtn.addEventListener('click', async () => {
        await eliminarOrden(id);
        myModal.hide();
    });
    const cancelarEliminarBtn = document.getElementById('cancelar-eliminar-btn');
    cancelarEliminarBtn.addEventListener('click', () => {
        myModal.hide();
    });
    myModal.show();
}
