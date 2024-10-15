const { response, request } = require('express');
const Establecimiento = require('../models/establecimientos.models'); // Importamos el modelo de Establecimiento
const isAuth = require('../Util/is-auth');

exports.buscarEstablecimientos = (request, response, next) => {};


exports.cambiarEstablecimiento = async (request, response, next) => {
    /*
    try{
        const Telefono = request.session.Telefono;
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
      // Llama al modelo para obtener todas las localizaciones (establecimientos)
      const localizaciones = await Establecimiento.getFullEstablecimientos();

      // Obtiene los establecimientos de la sesión
      const establecimientos = req.session.establecimientos || [];
      
      // Renderiza la vista y pasa las localizaciones como datos
      res.render('misEstablecimientos', { 
          localizaciones: localizaciones, 
          establecimientos: establecimientos || [], // Para el dropdown
      });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error al cargar establecimiento');
  }
};
