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
            let numid = 0;
            for (let i = 0; i < 10; i++){
                id += Math.floor(Math.random()* 10)
            }
            return numid;
        }
        const id_sello = generaridsello();
        const fechaActual = new Date().toISOString().split('T')[0];
        const horaActual = new Date().toISOString().split('T')[1].slice(0, 8);
        const query = 'INSERT INTO Sellos (id_sello, Fecha_sello, Hora_sello, Telefono) VALUES(?, ?, ?, ?) ';
        return db.execute(query, [id_sello,fechaActual,horaActual,Telefono]);
    }
};

module.exports = Sello;

