const { request, response } = require("express");
const Sucursales = require("../Models/sucursales.models");
const Usuario = require("../Models/usuario.models");

exports.getSucursales = async (request,response, next) => {
    const id_Usuario = request.session.usuario.id_Usuario;
    console.log("GET Sucursales");
    console.log(id_Usuario);
    console.log(request.session);
    const [sucursales] = await Sucursales.getSucursales(id_Usuario);
    response.render("misSucursales", {
        establecimientos: request.sesssion.establecimientos || [],
        sucursales: sucursales || [],
    })
}