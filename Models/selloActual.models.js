const db = require('C:\\Users\\gaelc\\RewardsSystem\\Util\\database.js');

class Sello {
    constructor(id_sello,Fecha_Sello,Hora_Sello,Telefono){
        this.id_sello = id_sello;
        this.Fecha_Sello = Fecha_Sello;
        this.Hora_Sello = Hora_Sello;
        this.Telefono = Telefono;
    }

    static obtenerSellosActualesPorTelefono(Telefono){
        const query = 'SELECT COUNT(*) FROM Sellos WHERE Telefono = ';
        return db.execute(query, [Telefono]);
    }
};

module.exports = Sello;