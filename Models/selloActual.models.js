const { request } = require('express');
const db = require('../Util/database');

class Sello {
    constructor(id_sello,Fecha_Sello,Hora_Sello,Telefono){
        this.id_sello = id_sello;
        this.Fecha_Sello = Fecha_Sello;
        this.Hora_Sello = Hora_Sello;
        this.Telefono = Telefono;
    }

    static registrarSelloTel(Telefono){

        function generaridsello(){
            let randomString = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 10; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        // Convert the string to an integer
        const randomInt = parseInt(randomString, 36); // Using base 36 to handle alphanumeric characters
        return randomInt;
        }
        
        const id_sello = generaridsello();
        const fechaActual = new Date().toISOString().split('T')[0];
        const horaActual = new Date().toISOString().split('T')[1].slice(0, 8);
        console.log('fechaActual:', fechaActual);
        console.log('horaActual:', horaActual);
        console.log("numid: ", id_sello);
        console.log("telefono:", Telefono);
        const query = 'INSERT INTO Sellos (id_sello, Fecha_sello, Hora_sello, Telefono) VALUES(?, ?, ?, ?) ';
        return db.execute(query, [id_sello,fechaActual,horaActual,Telefono]);
    }
};

module.exports = Sello;

