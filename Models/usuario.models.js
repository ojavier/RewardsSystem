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
    
    static modificarUPorId(id_Usuario, nuevosDatos) {
        const { Nombre } = nuevosDatos;

        const query = `
            UPDATE Usuarios
            SET Nombre = ?
            WHERE id_Usuario = ?
        `;
        const params = [Nombre];

        return db.execute(query, params);
    }
}

// Exportar la clase Usuario
module.exports = Usuario;
