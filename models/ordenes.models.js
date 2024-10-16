const { request } = require('express');
const db = require('../Util/database');
const { v4: uuidv4 } = require('uuid');

class Ordenes{

    constructor(id_Orden, nivel_Satisfaccion, Feedback, id_Establecimiento, Telefono){
        this.id_Orden = id_Orden;
        this.nivel_Satisfaccion = nivel_Satisfaccion;
        this.Feedback = Feedback;
        this.id_Establecimiento = id_Establecimiento;
        this.Telefono = Telefono;
    }

    static registrarOrden(id_Orden, nivel_Satisfaccion, Feedback, id_Establecimiento, Telefono) {
        const query = "INSERT INTO Ordenes (id_Orden, nivel_Satisfaccion, Feedback, id_Establecimiento, Telefono) VALUES (?, ?, ?, ?, ?)";
        console.log("id_Orden: ", id_Orden );
        console.log("nivel_Satisfaccion: ", nivel_Satisfaccion);
        console.log("Feedback: ", Feedback);
        console.log("id_Establecimiento: ", id_Establecimiento);
        console.log("Telefono: ", Telefono);
        return db.execute(query, [id_Orden, nivel_Satisfaccion, Feedback, id_Establecimiento, Telefono]);
    }

    static crearID(){
        const id_Orden = uuidv4();
        return id_Orden;
    }
    
}

module.exports = Ordenes;
