const db = require('../Util/database');

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
        return db.execute(query, [Telefono]);
    }
    // Método para registrar un nuevo usuario
    static registrar({ id_Usuario, Nombre, Apellido, Telefono }) {
        const query = `
            INSERT INTO Usuarios (id_Usuario, nombre, apellido, telefono) VALUES (?, ?, ?, ?)
        `;

        return db.execute(query, [id_Usuario, Nombre, Apellido, Telefono])
            .then(([result]) => {
                const id_RolCliente = 1;  // Asumiendo que 1 es el ID del rol 'cliente'

                // Asignar el rol por defecto al usuario
                const rolQuery = `
                    INSERT INTO UsuariosTienenRoles (id_Usuario, id_Rol)
                    VALUES (?, ?)
                `;
                return db.execute(rolQuery, [id_Usuario, id_RolCliente]);
            });
    }

    static buscar
}

module.exports = Usuario;
