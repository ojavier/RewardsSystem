const db = require('../Util/database');

module.exports = class Cliente {
    static buscarPorTelefono(telefono) {
        return db.execute(`
            SELECT u.Nombre, u.Apellido, c.Genero, 
                   YEAR(CURDATE()) - YEAR(c.fecha_Nacimiento) AS Edad 
            FROM Clientes c
            INNER JOIN Usuarios u ON c.id_Usuario = u.id_Usuario
            WHERE c.Telefono = ?`, [telefono]);
    }
};
