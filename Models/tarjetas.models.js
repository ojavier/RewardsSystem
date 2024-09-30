const db = require('../Util/database');

// Definición de la clase Tarjeta
class Tarjeta {
    constructor(Telefono, id_Establecimiento, Version, Emision) {
        this.Telefono = Telefono;
        this.id_Establecimiento = id_Establecimiento;
        this.Version = Version;
        this.Emision = Emision;
    }

    // Método para obtener todas las tarjetas de un establecimiento
    static obtenerPorEstablecimiento(idEstablecimiento) {
        const query = 'SELECT * FROM Tarjetas WHERE id_Establecimiento = ?';
        return db.execute(query, [idEstablecimiento]); // Usamos promesas
    }
}

// Exportar la clase Tarjeta
module.exports = Tarjeta;