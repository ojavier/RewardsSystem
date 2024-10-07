const { render } = require('ejs');
const Establecimiento = require('../Models/establecimientos.models');
const isAuth = require('../Util/is-auth');

exports.buscarEstablecimientos = (request, response, next) => {
    try{
        const Telefono = request.session.Telefono;
        console.log("Si está jalando");
        const [Establecimientos] = Establecimiento.buscarEstablecimientos(Telefono);
        
        response.render("misEstablecimientos", { Establecimientos: Establecimientos })
    }
    catch(err){
            console.error(err);
            response.status(500).send('Error al buscar establecimientos');
    };
};

exports.getEstablecimientos = async (request, response, next) => {
    try {
        if (request.session) {
            const establecimientos = await Establecimiento.buscarEstablecimientos(request.session.telefono);
            response.render("misEstablecimientos", { establecimientos });
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
