const db = require('../Util/database');

// Definición de la clase Usuario
class Usuario {
    constructor(id_Usuario, Nombre, Apellido, Telefono) {
        this.id_Usuario = id_Usuario;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Telefono = Telefono;
    }

    // Método para encontrar un usuario por su teléfono
    static buscarPorTelefono(Telefono) {
        const query = 'SELECT * FROM Usuarios WHERE Telefono = ?';
        return db.execute(query, [Telefono]); // Usamos promesas
    }
    
    static buscarId(Telefono) {
        const query = 'SELECT id_Usuario FROM Usuarios WHERE Telefono = ?';
        return db.execute(query, [Telefono]); // Usamos promesas
    }

    static modificarUPorId(id_Usuario, nuevosDatos, val) {

        const query = `
            UPDATE Usuarios
            SET ? = ?
            WHERE id_Usuario = ?
        `;
        const params = [val, nuevosDatos, id_Usuario];

        return db.execute(query, params);
    }
}

// Exportar la clase Usuario
module.exports = Usuario;
