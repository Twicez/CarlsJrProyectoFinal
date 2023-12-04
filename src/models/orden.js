class Orden{
    constructor(id, nombreCliente, numeroTelefono, productos, total, estatus, idMesero, idCocinero) {
           this.id = id;
           this.nombreCliente = nombreCliente;
           this.numeroTelefono =  numeroTelefono;
           this.productos = productos;
           this.total = total;
           this.estatus = estatus;
           this.idMesero = idMesero;
           this.idCocinero = idCocinero;
       }
   }
   module.exports = Orden;
   