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
    static obtenerPorEstablecimiento(idEstablecimientos) {


        const query = `
            SELECT DISTINCT Version, Emision, id_Establecimiento
            FROM Tarjetas
            WHERE 1 = 1 `;

        for(let id in idEstablecimientos) {
            query +=  ` OR id_Establecimiento = ${id} `;
        }

        query = `
            GROUP BY Version
        `;
        return db.execute(query);
    }
}

// Exportar la clase Tarjeta
module.exports = Tarjeta;