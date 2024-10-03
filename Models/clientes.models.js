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
        db.query(query,Telefono, (err, results) => {
            if (err){
                callback(err);
            }

            else if (results.length === 0) {
                callback(null, null);
            }

            else{
                const cliente = new Clientes(results[0].Telefono,results[0].Entidad,results[0].Genero,results[0].fecha_nacimiento,results[0].id_usuario);
                callback(null,cliente);
            }
        })
    }
}

module.exports = Clientes;