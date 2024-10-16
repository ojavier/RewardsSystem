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

    static buscarIDconTel(Telefono) {
        const query = "SELECT id_Usuario FROM  Usuarios WHERE Telefono = ?"
        return db.execute(query, [Telefono]);
    }
    
   // Método para registrar un nuevo usuario
   static registrar({ id_Usuario, Nombre, Apellido, Telefono }) {
    const query = `
        INSERT INTO Usuarios (id_Usuario, nombre, apellido, telefono) VALUES (?, ?, ?, ?)
    `;
        
        return db.execute(query, [id_Usuario, Nombre, Apellido, Telefono])
            .then(() => {
                // Query para asignar el rol de cliente al usuario
                const rolQuery = `
                    INSERT INTO UsuariosTienenRoles (id_Usuario, id_Rol) VALUES (?, 4)
                `;
                return db.execute(rolQuery, [id_Usuario]);
            });
    }

    static buscarClienteSearch(Telefono, callback){
        const query = "SELECT * FROM Usuarios WHERE Telefono = ?";
        return db.execute(query,[Telefono]);
    }

    // Método para actualizar la información de un usuario
    static modificarUsuario({ id_Usuario, Nombre, Apellido, Telefono }) {
        const query = `
            UPDATE Usuarios SET Nombre = ?, Apellido = ?, Telefono = ? WHERE id_Usuario = ?
        `;
        return db.execute(query, [Nombre, Apellido, Telefono, id_Usuario]);
    }

    // Método para actualizar el rol del usuario
    static modificarRol(id_Usuario, id_Rol) {
        const query = `
            UPDATE UsuariosTienenRoles SET id_Rol = ? WHERE id_Usuario = ?
        `;
        return db.execute(query, [id_Rol, id_Usuario]);
    }

    // Método para buscar el rol del usuario por ID
    static buscarRolPorId(id_Usuario) {
        const query = `
            SELECT id_Rol FROM UsuariosTienenRoles WHERE id_Usuario = ?
        `;
        return db.execute(query, [id_Usuario]);
    }

}

module.exports = Usuario;
