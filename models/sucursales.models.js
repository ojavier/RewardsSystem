const db = require("../Util/database");

class Sucursales {
    constructor(id_Sucursal, Direccion, Entidad, id_Establecimiento){
        this.id_Sucursal = id_Sucursal;
        this.Direccion = Direccion;
        this.Entidad = Entidad;
        this.id_Establecimiento = id_Establecimiento;
    }

    //Metodo para encontrar todas las sucursales que tiene un usuario
    static getSucursales(id_Usuario, id_Establecimiento){
        const query = "SELECT * FROM Sucursales, SucursalesTieneUsuarios WHERE Sucursales.id_Sucursal = SucursalesTieneUsuarios.id_Sucursal AND id_Usuario = ? AND id_Establecimiento = ? AND Delete_At IS NULL";
        return db.execute(query, [
            id_Usuario,
            id_Establecimiento,
        ]);
    }

    //Metodo para encontrar una sola sucursal con la direccion
    static searchSucursal(id_Usuario, Direccion){
        const direccionparecida = `${Direccion}%`; 
        console.log(direccionparecida);
        const query = "SELECT * FROM Sucursales, SucursalesTieneUsuarios WHERE Sucursales.id_Sucursal = SucursalesTieneUsuarios.id_Sucursal AND id_Usuario = ? AND Direccion LIKE ?;";
        return db.execute(query, [
            id_Usuario, 
            direccionparecida,
        ]);
    }

    static eliminarSucursal(id_Sucursal){
        const query = "UPDATE Sucursales SET Delete_At = CURRENT_TIMESTAMP WHERE id_Sucursal = ?";
        return db.execute(query,[
            id_Sucursal,
        ])
    }

    static modificarSucursal(id_Sucursal, Direccion, Entidad){
        const query = "UPDATE Sucursales SET Direccion = ?, Entidad = ? WHERE id_Sucursal = ?";
        return db.execute(query, [
            Direccion,
            Entidad,
            id_Sucursal, 
        ])
    }

    static crearSucursal(id_Sucursal, Direccion, Entidad, id_Establecimiento, id_Usuario, FechaIncorporacion) {
        const query1 = "INSERT INTO Sucursales (id_Sucursal, Direccion, Entidad, id_Establecimiento) VALUES (?, ?, ?, ?)";
        const query2 = "INSERT INTO SucursalesTieneUsuarios (id_Sucursal, id_Usuario, FechaIncorporacion) VALUES (?, ?, ?)";
      
        return db.query(query1, [
          id_Sucursal, 
          Direccion, 
          Entidad, 
          id_Establecimiento
        ])
        .then(() => db.query(query2, [
          id_Sucursal,
          id_Usuario,
          FechaIncorporacion,
        ]))
        .catch((err) => {
          console.log(err);
        });
    }
}

module.exports = Sucursales;
