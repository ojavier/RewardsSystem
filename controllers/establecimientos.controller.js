const { response, request } = require('express');
const Establecimiento = require('../models/establecimientos.models'); // Importamos el modelo de Establecimiento
const isAuth = require('../Util/is-auth');

exports.buscarEstablecimientos = (request, response, next) => { };


exports.cambiarEstablecimiento = async (request, response, next) => {
    request.session.establecimiento_id = request.body.establecimiento;
    response.redirect(`${process.env.PATH_SERVER}misVersiones`);
};

exports.getEstablecimientos = async (request, response, next) => {
    try {
        const establecimientos = await Establecimiento.getAllEstablecimientos();
        request.session.establecimientos = establecimientos;
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.getLocalizaciones = async (req, res, next) => {
    try {
        // Llama al modelo para obtener todas los establecimientos
        const Telefono = req.session.usuario.Telefono
        const localizaciones = await Establecimiento.buscarEstablecimientos(Telefono);
        const establecimientos = req.session.establecimientos || [];

        // Renderiza la vista y pasa las localizaciones como datos
        res.render('misEstablecimientos', {
            localizaciones: localizaciones,
            establecimientos: establecimientos || [], 
            id_Establecimiento: req.session.establecimiento_id || [],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar establecimiento');
    }
};

exports.establecimientoModificar = async (request, response) => {
    try{
        const id_Establecimiento = request.body.id_Sucursal;
        const Entidad = request.body.Entidad;
        const Nombre = request.body.nombre;
        const Telefono = request.session.usuario.Telefono;
        const establecimientos = request.session.establecimientos;
        console.log("Esto es el mod");
        console.log("id_Establecimiento: ", id_Establecimiento);
        console.log("Nombre: ", Nombre);
        console.log("Entidad: ", Entidad);
        await Sucursales.modificarSucursal(id_Sucursal,Direccion,Entidad,id_Establecimiento)
        const localizaciones = await Establecimiento.buscarEstablecimientos(Telefono);
        return response.render("misSucursales", {
            notification: "La establecimiento se modificó correctamente",
            type: "success",
            localizaciones: localizaciones,
            establecimientos: establecimientos,
            id_Establecimiento: id_Establecimiento || '',
        });
    }
    catch (err){
        console.error(err);
        return response.status(500).send('Error al modificar establecimiento');
    }
}

exports.eliminarEstablecimiento = async (request, response) => {
    try{
        const id_Establecimiento2 = request.body.id_Establecimiento;
        const id_Establecimiento = request.session.establecimiento_id;
        const establecimientos = request.session.establecimientos;
        const Telefono = request.session.usuario.Telefono;
        console.log("id_Establecimiento", id_Establecimiento2);
        await Establecimiento.eliminarEstablecimiento(id_Establecimiento2);
        console.log("Establecimiento Eliminado")
        const localizaciones = await Establecimiento.getLocalizaciones(Telefono);
        console.log(sucursales);
        return response.render("misEstablecimientos", {
            localizaciones: localizaciones,
            establecimientos:establecimientos,
            id_Establecimiento: request.session.establecimiento_id || [],
            })
    }
    catch(err){
        console.log(err);
            return response.status(500).send({ message: "Error al buscar eliminar sucursal" });
    }
            
}
