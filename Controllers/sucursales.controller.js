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

exports.sucursalModificar = (request, response) => {
    const id_Sucursal = "";
    const Direccion = "";
    const Entidad = "";
    const id_Establecimiento = request.body.id_Establecimiento;
    const establecimientos = request.session.establecimientos;
    console.log("id_Sucursal: ", id_Sucursal);
    console.log("Direccion: ", Direccion);
    console.log("Entidad: ", Entidad);
    console.log("id_Establecimiento: ", id_Establecimiento);
    Sucursales.modificarSucursal(id_Sucursal,Direccion,Entidad,id_Establecimiento)
        .then((results) => {
            return response.render("misSucursales", {
                sucursales: sucursales,
                establecimientos:establecimientos,
            })
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).send({ message: "Error al buscar sellos del cliente" });
        });
    
}

exports.eliminarSucursal = (request, response) => {
    const id_Sucursal = "";
    console.log("id_Sucursal", id_Sucursal);
    Sucursales.eliminarSucursal(id_Sucursal) 
        .then((results) => {
            return response.render("misSucursales", {
                sucursales: sucursales,
                establecimientos:establecimientos,
            })
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).send({ message: "Error al buscar sellos del cliente" });
        });
}