exports.getRoot = (request, response, next) => {
    response.render('misTarjetas');
};

exports.getConfig = (request, response, next) => {
    response.render('configuracion');
};

exports.getInfo = (request, response, next) => {
    response.render('miInformacion');
};

exports.getReportes = (request, response, next) => {
    response.render('Reportes');
};
