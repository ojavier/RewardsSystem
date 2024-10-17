const { request, response } = require("express");
const Sucursales = require("../models/sucursales.models");
const Usuario = require("../models/usuario.models");

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
        id_Establecimiento: request.session.establecimiento_id || [],
    })
}

exports.sucursalModificar = (request, response) => {
    const id_Sucursal = request.body.id_Sucursal;
    const Direccion = request.body.Direccion;
    const Entidad = request.body.Entidad;
    const id_Establecimiento = request.session.establecimiento_id;
    const establecimientos = request.session.establecimientos;
    console.log("Esto es el mod");
    console.log("id_Sucursal: ", id_Sucursal);
    console.log("Direccion: ", Direccion);
    console.log("Entidad: ", Entidad);
    console.log("id_Establecimiento: ", id_Establecimiento);
    Sucursales.modificarSucursal(id_Sucursal,Direccion,Entidad,id_Establecimiento)
        .then((results) => {
            return response.render("misSucursales", {
                notification: "La sucursal se modificó correctamente",
                type: "success",
                sucursales: sucursales,
                establecimientos: establecimientos,
                id_Establecimiento: id_Establecimiento || '',
            })
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).send({ message: "Error al buscar sellos del cliente" });
        });
    
}

exports.eliminarSucursal = (request, response) => {
    const id_Sucursal = request.body.id_Sucursal;
    console.log("id_Sucursal", id_Sucursal);
    Sucursales.eliminarSucursal(id_Sucursal) 
        .then((results) => {
            return response.render("misSucursales", {
                sucursales: sucursales,
                establecimientos:establecimientos,
                id_Establecimiento: request.session.establecimiento_id || [],
            })
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).send({ message: "Error al buscar sellos del cliente" });
        });
}

exports.crearSucursal = (request, response) => {
    function crearIDSucursal(){
        const id_sucursal = Math.floor(Math.random() * 203941) + 1;
        return id_sucursal;
    }
    const id_Establecimiento = request.session.establecimiento_id;
    const Direccion = request.body.Direccion;
    const Entidad = request.body.Entidad;
    const id_Sucursal = crearIDSucursal();
    console.log("id_Establecimiento", id_Establecimiento);
    Sucursales.crearSucursal(id_Sucursal, Direccion, Entidad, id_Establecimiento)
    .then(() => {
        return response.render(`${process.env.PATH_SERVER}misSucursales`,{
            establecimientos: request.session.establecimientos || [],
            id_Establecimiento: request.session.establecimiento_id || '',
            notification: "Sucursal creada con éxito",
            type: success,
        }); // Redirigir a /misSucursales
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send('Error al crear sucursal');
    });
}