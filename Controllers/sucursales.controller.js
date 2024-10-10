const { request, response } = require("express");
const Sucursales = require("../Models/sucursales.models");

exports.getSucursalesSearchBar = async (request,response, next) => {
    const id_Usuario = request.session.usuario.id_Usuario;
    const direccion = request.body.SearchSucursal;
    console.log("Buscando sucursal...");
    console.log(id_Usuario);
    console.log(direccion);
    const [sucursales] = await Sucursales.searchSucursal(id_Usuario, direccion);
    response.render("misSucursales", {
        establecimientos: request.sesssion.establecimientos || [],
        sucursales: sucursales || [],
    })
}