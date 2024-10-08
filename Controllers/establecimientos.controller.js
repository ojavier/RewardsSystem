const { response, request } = require('express');
const Establecimiento = require('../Models/establecimientos.models'); // Importamos el modelo de Establecimiento
const isAuth = require('../Util/is-auth');

exports.buscarEstablecimientos = (request, response, next) => {
    try{
        const Telefono = request.session.Telefono;
        console.log("Si está jalando");
        const [nombres] = Establecimiento.buscarEstablecimientos(Telefono);
        response.render("misEstablecimientos", {nombres: Establecimientos});
    }
    catch(err){
            console.error(err);
            response.status(500).send('Error al buscar establecimientos');
    };
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


