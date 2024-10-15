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
            WHERE id_Establecimiento = ? `;
        return db.execute(query, [
            id_Establecimientos,
        ]);
    }
}

// Exportar la clase Tarjeta
module.exports = Tarjeta;