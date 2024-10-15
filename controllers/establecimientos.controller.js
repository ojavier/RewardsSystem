const { response, request } = require('express');
const Establecimiento = require('../models/establecimientos.models'); // Importamos el modelo de Establecimiento
const Sucursales = require("../models/sucursales.models")
const isAuth = require('../Util/is-auth');
const Usuario = require('../models/usuario.models');

exports.cambiarEstablecimiento = async (request, response, next) => {
    /*
    try{
        const Telefono = request.session.usuario.Telefono;
        console.log("Si está jalando");
        console.log(Telefono);
        const establecimientos =  await Establecimiento.buscarEstablecimientos(Telefono);
        console.log(establecimientos);

        const id_Establecimiento = request.query.establecimiento;
        console.log(id_Establecimiento);
        const id_Usuario = request.session.usuario.id_Usuario;
        const [sucursales] = await Sucursales.getSucursales(id_Usuario, id_Establecimiento);
        return response.render("misSucursales", {
            establecimientos: establecimientos || [],
            sucursales: sucursales || [],
            id_Establecimiento: request.query.id_Establecimiento || -1,
        })
    }
    catch(err){
            console.error(err);
            response.status(500).send('Error al buscar establecimientos');
    };*/
    request.session.establecimiento_id = request.body.establecimiento;
    response.redirect(`${process.env.PATH_SERVER}misTarjetas`);
};



