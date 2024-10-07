const db = require('../Util/database');

class Clientes {
  constructor(Telefono, Entidad, Genero, fecha_nacimiento, id_usuario) {
    this.Telefono = Telefono;
    this.Entidad = Entidad;
    this.Genero = Genero;
    this.fecha_nacimiento = fecha_nacimiento;
    this.id_usuario = id_usuario;
  }

  static buscarClienteSearch(Telefono, callback) {
    const query = "SELECT * FROM Clientes WHERE Telefono = ?";
    return db.execute(query, [Telefono]);
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

  static buscarSellosCliente(Telefono, callback) {
    const query = "SELECT COUNT(*) AS cantidad_sellos FROM Sellos WHERE Telefono =?";
    return db.execute(query, [Telefono]);
  }

  static registrarCliente(Telefono, Entidad, Genero, fecha_nacimiento) {
    const query = `
        INSERT INTO Clientes (Telefono, Entidad, Genero, fecha_nacimiento)
        VALUES (?, ?, ?, ?)
      `;
    return db.execute(query, [Telefono, Entidad, Genero, fecha_nacimiento]);
  };

};

module.exports = Clientes;