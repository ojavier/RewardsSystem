const { request } = require('express');
const db = require('../Util/database');

class Sello {
    constructor(id_sello,Fecha_Sello,Hora_Sello,Telefono){
        this.id_sello = id_sello;
        this.Fecha_Sello = Fecha_Sello;
        this.Hora_Sello = Hora_Sello;
        this.Telefono = Telefono;
    }

    static registrarSelloTel(Telefono,Nota, Monto){

        function generaridsello(){
            const randint = Math.floor(Math.random() * 2147483648);
            return randint;
        }

        const id_sello = generaridsello();
        const fechaActual = new Date().toISOString().split('T')[0];
        const horaActual = new Date().toISOString().split('T')[1].slice(0, 8);
        console.log('fechaActual:', fechaActual);
        console.log('horaActual:', horaActual);
        console.log("Nota: ", Nota);
        console.log("numid: ", id_sello);
        console.log("Monto: ", Monto);
        console.log("telefono:", Telefono);
        const query = 'INSERT INTO Sellos (id_sello, Fecha_sello, Hora_sello, Telefono) VALUES(?, ?, ?, ?) ';
        return db.execute(query, [id_sello,fechaActual,horaActual,Telefono]);
    }
};

module.exports = Sello;

