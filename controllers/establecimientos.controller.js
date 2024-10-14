const { response, request } = require('express');
const Establecimiento = require('../models/establecimientos.models'); // Importamos el modelo de Establecimiento
const isAuth = require('../Util/is-auth');
const Usuario = require('../models/usuario.models');

exports.buscarEstablecimientos = (request, response, next) => {
    try{
        const Telefono = request.session.Telefono;
        console.log("Si está jalando");
        const [nombres] = Establecimiento.buscarEstablecimientos(Telefono);
        response.render("misEstablecimientos", {
            nombres: establecimientos,
        });
    }
    catch(err){
            console.error(err);
            response.status(500).send('Error al buscar establecimientos');
    };
};



