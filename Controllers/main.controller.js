const { request, response } = require("express");

exports.getLogin = (request, response, next) => {
    response.render('login');
};

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

exports.getEquipo = (request, response, next) => {
    response.render('miEquipo')
};