function cerrarSesion() {
    const token = obtenerTokenDeCookie("token");
    fetch("/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error("Error al cerrar sesión");
        }
        window.location.href = "/login";
    }).catch(error => {
        console.error("Error:", error);
    });
}

function obtenerTokenDeCookie(nombreCookie) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
        const [nombre, valor] = cookie.split('=');
        if (nombre === nombreCookie) {
            return valor;
        }
    }
    return null;
}
