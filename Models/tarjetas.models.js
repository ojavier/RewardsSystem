const db = require('../Util/database');

// Definición de la clase Tarjeta
class Tarjeta {
    constructor(id_Tarjeta, version, fecha_caducidad, imagen, id_Establecimiento) {
        this.id_Tarjeta = id_Tarjeta;
        this.version = version;
        this.fecha_caducidad = fecha_caducidad;
        this.imagen = imagen;
        this.id_Establecimiento = id_Establecimiento;
    }

    // Método para obtener todas las tarjetas de un establecimiento
    static obtenerPorEstablecimiento(idEstablecimiento) {
        const query = 'SELECT * FROM Tarjetas WHERE id_Establecimiento = ?';
        return db.execute(query, [idEstablecimiento]); // Usamos promesas
    }
}

// Exportar la clase Tarjeta
module.exports = Tarjeta;