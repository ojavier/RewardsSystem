const { render } = require('ejs');
const Establecimiento = require('../Models/establecimientos.models');
const isAuth = require('../Util/is-auth');

exports.buscarEstablecimientos = (request, response, next) => {
    const Telefono = request.session.Telefono
    Establecimiento.buscarEstablecimientos(Telefono)
        .then(([rows]) => {
            console.log(establecimientos);
            response.render("establecimientos", { establecimientos: rows });
        })
        .catch((err) => {
            console.error(err);
            response.status(500).send('Error al buscar establecimientos');
        });
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

