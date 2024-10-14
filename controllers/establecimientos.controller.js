const { response, request } = require('express');
const Establecimiento = require('../models/establecimientos.models'); // Importamos el modelo de Establecimiento
const isAuth = require('../Util/is-auth');
const Usuario = require('../models/usuario.models');

exports.buscarEstablecimientos = async (request, response, next) => {
    try{
        const Telefono = request.session.usuario.Telefono;
        console.log("Si está jalando");
        console.log(Telefono);
        const nombres =  await Establecimiento.buscarEstablecimientos(Telefono);
        console.log(nombres);
        const id_Establecimiento = request.query.establecimiento;
        console.log(id_Establecimiento);
        response.render("misEstablecimientos", {
            nombres: establecimientos,
            id_Establecimiento: id_Establecimiento,
        });
    }
    catch(err){
            console.error(err);
            response.status(500).send('Error al buscar establecimientos');
    };
};



