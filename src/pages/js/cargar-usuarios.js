const tabla = document.querySelector("#tabla-usuarios-body");
const usuarios = [];

const consultarUsuarios = async () => {
    const meseros = await consultarMeseros();
    const cocineros = await consultarCocineros();
    const administradores = await consultarAdministradores();
    Promise.all([meseros, cocineros, administradores]).then(dataArray => {
        usuarios.push(...dataArray.flat());
        console.table(usuarios);
        mostrarUsuariosEnTabla();
    }).catch(error => {
        console.error(error);
    });
};

const consultarMeseros = async () => {
    const meseros = fetch("/meseros").then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }
        return response.json();
    });
    return meseros;
}

const consultarCocineros = async () => {
    const cocineros = fetch("/cocineros").then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }
        return response.json();
    });
    return cocineros;
}

const consultarAdministradores = async () => {
    const administradores = fetch("/administradores").then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }
        return response.json()
    });
    return administradores
}

const mostrarUsuariosEnTabla = async () => {
    const tabla = document.querySelector('#tabla-usuarios-body');
    tabla.innerHTML = '';

    usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.setAttribute("user-id", `${usuario.puesto}-${usuario.id}`);

        const celdaUsuario = document.createElement('td');
        celdaUsuario.textContent = usuario.nombreUsuario;
        celdaUsuario.classList.add("align-middle", "nombreUsuario");
        fila.appendChild(celdaUsuario);

        const celdaPuesto = document.createElement('td');
        celdaPuesto.textContent = usuario.puesto;
        celdaPuesto.classList.add("align-middle");
        fila.appendChild(celdaPuesto);

        const celdaOperacion = document.createElement('td');
        celdaOperacion.classList.add('text-end');

        // const botonEditar = document.createElement('button');
        // botonEditar.classList.add('btn', 'btn-primary', 'me-2', "editar");
        // botonEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';
        // botonEditar.setAttribute('data-id', `${usuario.puesto}-${usuario.id}`);
        // botonEditar.addEventListener('click', async () => await editarUsuario(`${usuario.puesto}-${usuario.id}`));
        // celdaOperacion.appendChild(botonEditar);

        const botonEliminar = document.createElement('button');
        botonEliminar.classList.add('btn', 'btn-danger', "eliminar");
        botonEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>';
        botonEliminar.setAttribute('data-id', `${usuario.puesto}-${usuario.id}`);
        botonEliminar.addEventListener('click', () => mostrarConfirmarEliminarModal(`${usuario.puesto}-${usuario.id}`));
        celdaOperacion.appendChild(botonEliminar);

        fila.appendChild(celdaOperacion);
        tabla.appendChild(fila);
    });
};

window.onload = async () => {
    await consultarUsuarios();
};