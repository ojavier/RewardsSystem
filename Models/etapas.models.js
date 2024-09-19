const db = require('../Util/database');

class Etapa {
    constructor(id_Etapa, Cant_Sellos, Minimo_Compra, Descuento, id_Producto) {
        this.id_Etapa = id_Etapa;
        this.Cant_Sellos = Cant_Sellos;
        this.Minimo_Compra = Minimo_Compra;
        this.Descuento = Descuento;
        this.id_Producto = id_Producto;
    }

    // Método para encontrar una etapa por su id
    static buscarPorId(id_Etapa) {
        const query = 'SELECT * FROM Etapa WHERE id_Etapa = ?';
        return db.execute(query, [id_Etapa]); // Usamos promesas
    }

    // Método para modificar los datos de una etapa específica por su id
    static modificarPorId(id_Etapa, nuevosDatos) {
        const { Cant_Sellos, Minimo_Compra, Descuento, id_Producto } = nuevosDatos;
        const query = `
            UPDATE Etapa 
            SET Cant_Sellos = ?, Minimo_Compra = ?, Descuento = ?, id_Producto = ?
            WHERE id_Etapa = ?
        `;
        return db.execute(query, [Cant_Sellos, Minimo_Compra, Descuento, id_Producto, id_Etapa]); // Usamos promesas
    }
}

module.exports = Etapa;
