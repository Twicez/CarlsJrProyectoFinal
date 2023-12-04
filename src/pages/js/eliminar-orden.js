const eliminarFilaOrden = (idOrden) => {
    const filaProducto = document.querySelector(`tr[data-id-orden="${idOrden}"]`);
    if (filaProducto) {
        filaProducto.remove();
    } else {
        console.error("Error: No se encontró la fila de la orden para eliminar.");
    }
};

const eliminarOrden = async (idOrden) => {
    const opciones = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const response = await fetch(`/ordenes/${idOrden}`, opciones);
        if (response.ok) {
            console.log(await response.json());
            eliminarFilaOrden(idOrden);
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
