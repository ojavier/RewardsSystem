const db = require('../Util/database');

class Reportes {
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
    }

    static obtenerTopDiasSellos() {
        const query = `
        SELECT 
            DAYNAME(Fecha_Sello) AS DiaSemana, 
            COUNT(*) AS total_sellos
        FROM 
            Sellos
        GROUP BY 
            DiaSemana
        ORDER BY 
            FIELD(DiaSemana, 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado');
    `
        return db.execute(query);
        return db.execute(query);

    }

    static obtenerSellosPorHora() {
        const query = `
        SELECT 
            HOUR(Hora_Sello) AS hora,
            COUNT(id_Sello) AS total_sellos
        FROM 
            Sellos
        GROUP BY 
            HOUR(Hora_Sello)
        ORDER BY 
            hora;
    `;

        return db.execute(query);

    }

    static obtenerTopClientesSellos() {
        const query = `
        SELECT c.Telefono, c.Nombre, COUNT(s.id_Sello) AS total_sellos
        FROM Clientes c
        JOIN Sellos s ON c.Telefono = s.Telefono_Cliente
        GROUP BY c.Telefono
        ORDER BY total_sellos DESC
        LIMIT 10;

    `;

        return db.execute(query);
    }
}

module.exports = Reportes