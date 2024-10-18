const db = require('../Util/database');

// Definición de la clase Tarjeta
class Tarjeta {
    constructor(Telefono, id_Establecimiento, Version, Emision) {
        this.Telefono = Telefono;
        this.id_Establecimiento = id_Establecimiento;
        this.Version = Version;
        this.Emision = Emision;
    }

    // Método para obtener las versiones de tarjeta de un establecimiento
    static obtenerPorEstablecimiento(id_Establecimientos) {
        const query = `
            SELECT *
            FROM Tarjetas
            WHERE id_Establecimiento = ? AND Delete_At IS NULL `;
        return db.execute(query, [
            id_Establecimientos,
        ]);
    }

    static eliminarVersion(Version, id_Establecimiento) {
        const query = `
            UPDATE Tarjetas 
            SET Delete_At = CURRENT_TIMESTAMP 
            WHERE Version = ? AND id_Establecimiento = ?
        `;
        return db.execute(query, [Version, id_Establecimiento]);
    }

    static modificarVersion(Version, id_Establecimiento) {
        const query = `
            UPDATE Tarjetas
            SET Emision = ?
            WHERE Version = ? AND id_Establecimiento = ?
        `;
        return db.execute(query, [Version, id_Establecimiento]);
    }

    static getTarjeta(id_Establecimiento, version) {
        const query = `
          SELECT *
          FROM Tarjetas
          WHERE id_Establecimiento = ? AND Version = ? 
        `;
        return db.execute(query, [id_Establecimiento, version]);
    }
}

// Exportar la clase Tarjeta
module.exports = Tarjeta;