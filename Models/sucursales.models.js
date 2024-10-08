const db = require("../Util/database");

class Sucursales {
    constructor(id_Sucursal, Direccion, Entidad, id_Establecimiento){
        this.id_Sucursal = id_Sucursal;
        this.Direccion = Direccion;
        this.Entidad = Entidad;
        this.id_Establecimiento = id_Establecimiento;
    }

    static getSucursales(Telefono){
        const query = "SELECT * FROM Sucursales, SucursalesTieneUsuarios WHERE Sucursales.id_Sucursal = SucursalesTieneUsuarios.id_Sucursal AND Telefono = ? "
        db.execute(query, [Telefono]);
    }
}

module.exports = Sucursales;
