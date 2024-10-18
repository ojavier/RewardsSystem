const { request, response } = require("express");
const Sucursales = require("../models/sucursales.models");
const Usuario = require("../models/usuario.models");
const { v4: uuidv4 } = require('uuid');

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

exports.sucursalModificar = async (request, response) => {
    try{
        const id_Sucursal = request.body.id_Sucursal;
        const Direccion = request.body.Direccion;
        const Entidad = request.body.Entidad;
        const id_Establecimiento = request.session.establecimiento_id;
        const establecimientos = request.session.establecimientos;
        const id_Usuario = request.session.usuario.id_Usuario;
        console.log("Esto es el mod");
        console.log("id_Sucursal: ", id_Sucursal);
        console.log("Direccion: ", Direccion);
        console.log("Entidad: ", Entidad);
        console.log("id_Establecimiento: ", id_Establecimiento);
        await Sucursales.modificarSucursal(id_Sucursal,Direccion,Entidad,id_Establecimiento)
        const sucursales = await Sucursales.getSucursales(id_Usuario, id_Establecimiento);
        return response.render("misSucursales", {
            notification: "La sucursal se modificó correctamente",
            type: "success",
            sucursales: sucursales,
            establecimientos: establecimientos,
            id_Establecimiento: id_Establecimiento || '',
        });
    }
    catch (err){
        console.error(err);
        return response.status(500).send('Error al modificar sucursal');
    }
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

exports.crearSucursal = async (request, response) => {
    try {
        function crearIDSucursal(){
          const id_sucursal = uuidv4();
          return id_sucursal;
        }
        
        console.log(request.session);
        const id_Establecimiento = request.session.establecimiento_id;
        const Direccion = request.body.Direccion;
        const Entidad = request.body.Entidad;
        const id_Sucursal = crearIDSucursal();
        console.log("id_Establecimiento", id_Establecimiento);
        const id_Usuario = request.session.usuario.id_Usuario;
        console.log(id_Usuario);
        const fechaActual = new Date();
        const FechaIncorporacion = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}-${fechaActual.getDate().toString().padStart(2, '0')} ${fechaActual.getHours().toString().padStart(2, '0')}:${fechaActual.getMinutes().toString().padStart(2, '0')}:${fechaActual.getSeconds().toString().padStart(2, '0')}`;
        console.log(FechaIncorporacion);
        
        await Sucursales.crearSucursal(id_Sucursal, Direccion, Entidad, id_Establecimiento, id_Usuario, FechaIncorporacion);
        
        const sucursales = await Sucursales.getSucursales(id_Usuario, id_Establecimiento);
        return response.render(`misSucursales`, {
            sucursales: sucursales,
            establecimientos: request.session.establecimientos || [],
            id_Establecimiento: request.session.establecimiento_id || '',
            notification: "Sucursal creada con éxito",
            type: "success",
        }); 
      } 
      catch (err) {
        console.error(err);
        return response.status(500).send('Error al crear sucursal');
      }
}