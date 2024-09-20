const db = require('../Util/database');

// Definición de la clase Etapa
class Etapa {
    constructor(id_Etapa, Cant_Sellos, Minimo_Compra, Descuento, id_Producto) {
        this.id_Etapa = id_Etapa;
        this.Cant_Sellos = Cant_Sellos;
        this.Minimo_Compra = Minimo_Compra;
        this.Descuento = Descuento;
    }

    // Método para encontrar una etapa por su id
    static buscarPorId(id_Etapa) {
        const query = 'SELECT * FROM Etapa WHERE id_Etapa = ?';
        return db.execute(query, [id_Etapa]); // Usamos promesas
    }

    // Método para modificar los datos de una etapa específica por su id
    static modificarPorId(id_Etapa, nuevosDatos) {
        const { Cant_Sellos, Minimo_Compra, Descuento, id_Producto } = nuevosDatos;
        
        // Consulta corregida
        const query = `
            UPDATE Etapa 
            SET Cant_Sellos = ?, Minimo_Compra = ?, Descuento = ?
            WHERE id_Etapa = ?
        `;
        
        const params = [Cant_Sellos, Minimo_Compra, Descuento];
        params.push(id_Etapa);  // Asegurarse de que el id_Etapa se empuje al final
        
        return db.execute(query, params);
    }
   
}

// Exportar la clase Etapa
module.exports = Etapa;
