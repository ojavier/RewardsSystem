const db = require('../Util/database');

class Reportes{
    static obtenerTopTenderos() {
    const query = `
        SELECT u.id_Usuario, u.Nombre, u.Apellido, COUNT(s.id_Sello) AS total_sellos
        FROM Usuarios u
        JOIN UsuariosTienenRoles ur ON u.id_Usuario = ur.id_Usuario
        JOIN Roles r ON ur.id_Rol = r.id_Rol
        JOIN Sellos s ON u.Telefono = s.Telefono
        WHERE r.Tipo_Roles = 'Tendero'
        GROUP BY u.id_Usuario, u.Nombre, u.Apellido
        ORDER BY total_sellos DESC
        LIMIT 10;
    `;

    return db.execute(query);
}}

module.exports = Reportes