const { render } = require('ejs');
const Establecimiento = require('../Models/establecimientos.models');
const isAuth = require('../Util/is-auth');

exports.buscarEstablecimientos = (request, response, next) => {
    const Telefono = request.session.Telefono
    const [establecimientos] = Establecimiento.buscarEstablecimientos(Telefono);
    console.log(establecimientos)
    response.render("/misTarjetas", { establecimientos: establecimientos})
};