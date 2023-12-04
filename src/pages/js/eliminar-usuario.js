const eliminarUsuario = async (data) => {
    const usuario = data.split('-');
    const puesto = usuario[0];
    const id = usuario[1];
    const url = `/${puesto}${puesto !== 'administrador' ? 's' : 'es'}/${id}`;
    const opciones = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(url, opciones);
        if (response.ok) {
            const usuarioEliminado = await response.json();
            console.log(JSON.stringify(usuarioEliminado));
            eliminarFila(usuario);
        }
    } catch (e) {
        console.log("No se pudo eliminar el usuario");
    }
}

const eliminarFila = (usuario) => {
    const elementoEliminar = document.querySelector(`tr[user-id="${usuario[0]}-${usuario[1]}"]`);
    if (elementoEliminar) {
        elementoEliminar.remove();
    } else {
        console.log(`No se encontró ningún usuario con user-id ${usuario[1]}.`);
    }
};

const mostrarConfirmarEliminarModal = (data) => {
    const myModal = new bootstrap.Modal(document.getElementById('confirmar-eliminar-modal'));
    const confirmarEliminarBtn = document.getElementById('confirmar-eliminar-btn');
    confirmarEliminarBtn.addEventListener('click', async () => {
        await eliminarUsuario(data);
        myModal.hide();
    });
    const cancelarEliminarBtn = document.getElementById('cancelar-eliminar-btn');
    cancelarEliminarBtn.addEventListener('click', () => {
        myModal.hide();
    });
    myModal.show();
}
