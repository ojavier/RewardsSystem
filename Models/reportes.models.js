const db = require('../Util/database');

class Reportes{
    static obtenerTopTenderos() {
    const query = `
        SELECT 
            u.Nombre,
            u.Apellido,
            s.TelefonoUsuario,
            COUNT(s.id_Sello) AS total_sellos
        FROM 
            Sellos s
        JOIN 
            Usuarios u ON s.TelefonoUsuario = u.Telefono
        GROUP BY 
            s.TelefonoUsuario
        ORDER BY 
            total_sellos DESC
        LIMIT 10;
    `;

    return db.execute(query);
}}

module.exports = Reportes