const agregarUsuarioBtn = document.getElementById("agregar-usuario");
const agregarUsuarioForm = document.getElementById("formulario");
const registrarUsuario = document.getElementById("registrar-usuario");
const alert = document.getElementById("alert");
const message = document.getElementById("message");

agregarUsuarioBtn.addEventListener("click", () => {
    agregarUsuarioForm.classList.toggle("visually-hidden");
});

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

const obtenerDatos = () => {
    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const contrasenia = document.getElementById("contrasenia").value;
    const puesto = document.getElementById("puesto").value;

    if (!nombreUsuario || !contrasenia || !puesto) {
        ocultarAlertas();
        mostrarAlerta("Ingrese datos válidos.");
        return;
    }

    const usuario = {
        nombreUsuario,
        contrasenia,
        puesto
    };

    return usuario;
}

const registrarNuevoUsuario = async (usuario) => {
    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    };
    try {
        if (!usuario.puesto) {
            ocultarAlertas();
            mostrarAlerta("Hubo un error al registrar al usuario.");
            return;
        } else if (usuario.puesto === "mesero" || usuario.puesto === "administrador" || usuario.puesto === "cocinero") {
            const url = `/${usuario.puesto}${usuario.puesto !== 'administrador' ? 's' : 'es'}`;
            const respuesta = await fetch(url, opciones);
            agregarFilaTabla(await respuesta.json());
            if (respuesta.ok) {
                mostrarMensajeExito("Usuario registrado exitosamente.");
            } else {
                mostrarAlerta("Hubo un error al registrar al usuario.");
            }
        }
    } catch (e) {
        console.error(e);
    }
}

const agregarFilaTabla = (usuario) => {
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
};

registrarUsuario.addEventListener("click", () => {
    const usuario = obtenerDatos();
    registrarNuevoUsuario(usuario);
});