class Administrador{
    constructor(id, nombreUsuario, contrasenia, superUsuarioId, puesto) {
           this.id = id;
           this.nombreUsuario=nombreUsuario;
           this.contrasenia=contrasenia;
           this.superUsuarioId=superUsuarioId;
           this.puesto = puesto;
       }
   }
   module.exports = Administrador;