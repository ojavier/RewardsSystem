const { render } = require('ejs');
const Establecimiento = require('../Models/establecimientos.models');
const isAuth = require('../Util/is-auth');

exports.buscarEstablecimientos = (request, response, next) => {
    
        const Telefono = request.session.Telefono;
        console.log("Si está jalando");
        Establecimiento.buscarEstablecimientos(Telefono).then(([establecimientos, fieldData]) => {
            console.log(fieldData);
            console.log(establecimientos);
            response.render("misEstablecimientos", { establecimientos: establecimientos })
        }).catch((err) => {

            console.error(err);
            response.status(500).send('Error al buscar establecimientos');
        });
        
        
    
};

exports.getEstablecimientos = async (request, response, next) => {
    try {
        if (request.session) {
            const establecimientos = await Establecimiento.buscarEstablecimientos(request.session.telefono);
            response.render("misEstablecimientos", { Establecimientos: establecimientos });
        }
        else {
        console.error('Sesión no inicializada');
        }
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
};
