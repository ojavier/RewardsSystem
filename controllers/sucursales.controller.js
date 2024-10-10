const { request, response } = require("express");
const Sucursales = require("../models/sucursales.models");
const Usuario = require("../models/usuario.models");

exports.getSucursales = async (request,response, next) => {
    const Telefono = request.session.telefono;
    const id_Usuario = Usuario.buscarIDconTel(Telefono);
    const [sucursales] = await Sucursales.getSucursales(id_Usuario);
    response.render("misSucursales", {
        establecimientos: request.sesssion.establecimientos || [],
        sucursales: sucursales
    })
}