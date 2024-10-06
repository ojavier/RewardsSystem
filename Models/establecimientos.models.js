const { request } = require('express');
const db = require('../Util/database');

class Establecimiento{

    constructor(id_Establecimiento, Nombre, Entidad){
        this.id_Establecimiento = id_Establecimiento;
        this.Nombre = Nombre;
        this.Entidad = Entidad;
    }

    static buscarEstablecimientos(Telefono) {
        const query = "SELECT Establecimientos.Nombre FROM Establecimientos, Usuarios, Sucursales, SucursalesTieneUsuarios WHERE Establecimientos.id_Establecimiento = Sucursales.id_Establecimiento AND Usuarios.id_Usuario = SucursalesTieneUsuarios.id_usuario AND Telefono = ?";
        return db.execute(query, [Telefono]);
    }
    
}

module.exports = Establecimiento;
