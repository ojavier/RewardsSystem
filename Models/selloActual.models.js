const { request } = require('express');
const db = require('../Util/database');

class Sello {
    //Constructor de los atributos
    constructor(id_sello,Fecha_Sello,Hora_Sello,TelefonoCliente,TelefonoUsuario){
        this.id_sello = id_sello;
        this.Fecha_Sello = Fecha_Sello;
        this.Hora_Sello = Hora_Sello;
        this.Telefono = TelefonoCliente;
        this.id_Usuario = TelefonoUsuario;
        
    }
    //Método estatico para registrar sello en base al telefono
    static registrarSelloTel(TelefonoCliente, TelefonoUsuario){
        // Genera un numero al azar para el id
        function generaridsello(){
            const randint = Math.floor(Math.random() * 2147483648);
            return randint;
        }

        const id_sello = generaridsello();
        const fechaActual = new Date().toISOString().split('T')[0];
        const horaActual = new Date().toISOString().split('T')[1].slice(0, 8);
        console.log('fechaActual:', fechaActual);
        console.log('horaActual:', horaActual);
        console.log("numid: ", id_sello);
        console.log("telefono:", TelefonoCliente);
        console.log("Telefono_usuario: ", TelefonoUsuario);
        //query insertada a base de datos
        const query = 'INSERT INTO Sellos (id_sello, Fecha_sello, Hora_sello, TelefonoCliente, TelefonoUsuario) VALUES(?, ?, ?, ?, ?) ';
        return db.execute(query, [id_sello,fechaActual,horaActual,TelefonoCliente,TelefonoUsuario]);
    }
};

module.exports = Sello;

