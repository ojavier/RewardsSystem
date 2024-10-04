const db = require('../Util/database');

class Clientes{
    constructor(Telefono,Entidad,Genero,fecha_nacimiento,id_usuario){
        this.Telefono = Telefono;
        this.Entidad = Entidad;
        this.Genero = Genero;
        this.fecha_nacimiento = fecha_nacimiento;
        this.id_usuario = id_usuario;
    }

    static buscarClienteSearch(Telefono, callback){
        const query = "SELECT * FROM Clientes WHERE Telefono = ?";
        return db.execute(query,[Telefono]);
    }
}

module.exports = Clientes;