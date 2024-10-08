const { request } = require('express');
const db = require('../Util/database');

class Establecimiento{

    constructor(id_Establecimiento, Nombre, Entidad){
        this.id_Establecimiento = id_Establecimiento;
        this.Nombre = Nombre;
        this.Entidad = Entidad;
    }

    static buscarEstablecimientos(Telefono) {
        const query = "SELECT DISTINCT Establecimientos.id_Establecimiento as id, Establecimientos.Nombre as nombre FROM Establecimientos, Usuarios, Sucursales, SucursalesTieneUsuarios WHERE Establecimientos.id_Establecimiento = Sucursales.id_Establecimiento AND Usuarios.id_Usuario = SucursalesTieneUsuarios.id_usuario AND Telefono = ?";
        return db.execute(query, [Telefono]);
    }

    static getAllEstablecimientos(id_usuario) {
        const query = "SELECT * FROM Establecimientos WHERE id_Usuario = ?";
        db.execute(query, [id_usuario]);
    }
    
}

module.exports = Establecimiento;
