const db = require("../Util/database");

class Sucursales {
    constructor(id_Sucursal, Direccion, Entidad, id_Establecimiento){
        this.id_Sucursal = id_Sucursal;
        this.Direccion = Direccion;
        this.Entidad = Entidad;
        this.id_Establecimiento = id_Establecimiento;
    }

    //Metodo para encontrar todas las sucursales que tiene un usuario
    static getSucursales(id_Usuario){
        const query = "SELECT * FROM Sucursales, SucursalesTieneUsuarios WHERE Sucursales.id_Sucursal = SucursalesTieneUsuarios.id_Sucursal AND id_Usuario = ? ";
        return db.execute(query, [id_Usuario]);
    }

    //Metodo para encontrar una sola sucursal con la direccion
    static searchSucursal(id_Usuario, Direccion){
        const direccionparecida = `${Direccion}%`; 
        const query = "SELECT * FROM Sucursales, SucursalesTieneUsuarios WHERE Sucursales.id_Sucursal = SucursalesTieneUsuarios.id_Sucursal AND id_Usuario = ? AND Direccion LIKE '? ';";
        return db.execute(query, [
            id_Usuario, 
            direccionparecida,
        ]);
    }
}

module.exports = Sucursales;
