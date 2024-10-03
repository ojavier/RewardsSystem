const db = require('../Util/database');

class Clientes{
    constructor(Telefono,Entidad,Genero,fecha_nacimiento,id_usuario){
        this.Telefono = Telefono;
        this.Entidad = Entidad;
        this.Genero = Genero;
        this.fecha_nacimiento = fecha_nacimiento;
        this.id_usuario = id_usuario;
    }

    static async obtenerTodos() {
        try {
          const query = 'SELECT * FROM Clientes';
          const [rows] = await db.query(query);
          return rows;
        } catch (err) {
          throw err;
        }
    }

    static buscarClienteSearch(Telefono, callback){
        const query = "SELECT * FROM Clientes WHERE Telefono = ?";
        return db.execute(query,[Telefono]);
    }
}

module.exports = Clientes;