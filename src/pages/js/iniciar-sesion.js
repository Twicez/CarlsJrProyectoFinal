const mostrarAlerta = (mensaje) => {
    const alert = document.getElementById("alert");
    alert.innerText = mensaje;
    alert.classList.remove("visually-hidden");
}

const obtenerRol = () => {
    return document.getElementById("rol").value;
}

document.addEventListener("DOMContentLoaded", function() {
    const correoInput = document.getElementById('correo');
    const correoLabel = document.querySelector('label[for="correo"]');
    if (correoInput) {
        const initialState = {
            type: correoInput.type,
            id: correoInput.id,
            name: correoInput.name,
            labelFor: correoLabel.getAttribute('for')
        };
        document.getElementById('rol').addEventListener('change', function() {
            const selectedRol = this.value;
            if (selectedRol !== 'superusuario') {
                correoInput.type = 'text';
                correoInput.id = 'nombreUsuario';
                correoInput.name = 'nombreUsuario';
                correoLabel.setAttribute('for', 'nombreUsuario');
                correoLabel.innerText = "Nombre de usuario";
            } else {
                correoInput.type = initialState.type;
                correoInput.id = initialState.id;
                correoInput.name = initialState.name;
                correoLabel.setAttribute('for', initialState.labelFor);
                correoLabel.innerText = "Correo";
            }
        });
    } else {
        console.error("El elemento con ID 'correo' no se encuentra en el DOM.");
    }
});

const autenticarSuperUsuario = async () => {
    const correo = document.getElementById("correo").value;
    const contrasenia = document.getElementById("contrasenia").value;
    if (!correo || !contrasenia) {
        mostrarAlerta("Ingrese un correo o contraseña");
        return;
    }
    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo,
            contrasenia
        })
    };
    try {
        const response = await fetch("/superusuarios-auth", opciones);
        const data = await response.json();
        if (!data.tokenDeAcceso) {
            mostrarAlerta("Credenciales inválidas");
            return;
        }
        paginaHome(data);
    } catch (e) {
        console.log(e);
    }
}

const autenticarMesero = async () => {
    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const contrasenia = document.getElementById("contrasenia").value;
    if (!nombreUsuario || !contrasenia) {
        mostrarAlerta("Ingrese un nombre de usuario o contraseña");
        return;
    }
    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombreUsuario,
            contrasenia
        })
    };
    try {
        const response = await fetch("/meseros-auth", opciones);
        const data = await response.json();
        if (!data.tokenDeAcceso) {
            mostrarAlerta("Credenciales inválidas");
            return;
        }
        paginaHome(data);
    } catch (e) {
        console.log(e);
    }
}

const autenticarAdministrador = async () => {
    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const contrasenia = document.getElementById("contrasenia").value;
    if (!nombreUsuario || !contrasenia) {
        mostrarAlerta("Ingrese un nombre de usuario o contraseña");
        return;
    }
    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombreUsuario,
            contrasenia
        })
    };
    try {
        const response = await fetch("/administradores-auth", opciones);
        const data = await response.json();
        if (!data.tokenDeAcceso) {
            mostrarAlerta("Credenciales inválidas");
            return;
        }
        paginaHome(data);
    } catch (e) {
        console.log(e);
    }
}

const autenticarCocinero = async () => {
    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const contrasenia = document.getElementById("contrasenia").value;
    if (!nombreUsuario || !contrasenia) {
        mostrarAlerta("Ingrese un nombre de usuario o contraseña");
        return;
    }
    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombreUsuario,
            contrasenia
        })
    };
    try {
        const response = await fetch("/cocineros-auth", opciones);
        const data = await response.json();
        if (!data.tokenDeAcceso) {
            mostrarAlerta("Credenciales inválidas");
            return;
        }
        paginaHome(data);
    } catch (e) {
        console.log(e);
    }
}

const paginaHome = async (data) => {
    let response;
    const opciones = {
        method: "GET",
        headers: {
            "Content-Type": "text/html",
            "Authorization": `Bearer ${data.tokenDeAcceso}`,
        }
    };
    try {
        if (data.usuario.puesto) {
            response = await fetch(`/${data.usuario.puesto.toLowerCase()}/home`)
            if (!response.ok) {
                console.error(`Error al cargar /${data.usuario.puesto.toLowerCase()}/home. Código de estado: ${response.status}`);
                return;
            }
            window.location.href = `/${data.usuario.puesto.toLowerCase()}/home`;
        } else {
            response = await fetch("/superusuario/home", opciones);
            if (!response.ok) {
                console.error(`Error al cargar /superusuario/home. Código de estado: ${response.status}`);
                return;
            }
            window.location.href = "/superusuario/home";
        }
    } catch (error) {
        console.error(error);
    }
}

const iniciarSesion = () => {
    if (obtenerRol() === "cocinero") {
        autenticarCocinero();
    }
    if (obtenerRol() === "mesero") {
        autenticarMesero();
    }
    if (obtenerRol() === "administrador") {
        autenticarAdministrador();
    }
    if (obtenerRol() === "superusuario") {
        autenticarSuperUsuario();
    }
}