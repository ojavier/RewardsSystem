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
        const { Cant_Sellos, Minimo_Compra, Descuento } = nuevosDatos;

        const query = `
            UPDATE Etapa 
            SET Cant_Sellos = ?, Minimo_Compra = ?, Descuento = ?
            WHERE id_Etapa = ?
        `;

        const params = [Cant_Sellos, Minimo_Compra, Descuento, id_Etapa];

        return db.execute(query, params);
    }

    static crearEtapa(Cant_Sellos, Minimo_Compra, Descuento, id_Producto) {
        const id_Etapa = "002"
        const query = "INSERT INTO Etapa (id_Etapa, Cant_Sellos, Minimo_Compra, Descuento, id_Producto) VALUES(?, ?, ?, ?, ?)";
        return db.execute(query, [id_Etapa, Cant_Sellos, Minimo_Compra, Descuento, id_Producto]);
    }

    static encontrarProducto(nombre_producto) {
        const query = "SELECT id_Producto FROM Productos WHERE Descripcion = ?";
        return db.execute(query, [nombre_producto]);
    }

    static buscarPorTarjeta(telefono) {
        const query = `
            SELECT e.id_Etapa, e.Cant_Sellos, e.Minimo_Compra, e.Descuento
            FROM Etapa e
            INNER JOIN TarjetasOfrecenEtapa te ON e.id_Etapa = te.id_Etapa
            WHERE te.Telefono = ?
        `;
        return db.execute(query, [telefono]);
    }
}

// Exportar la clase Etapa
module.exports = Etapa;
