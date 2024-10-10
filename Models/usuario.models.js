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

}

module.exports = Usuario;
