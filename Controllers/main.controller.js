const { request, response } = require("express");
const Clientes = require('../Models/clientes.models');

// Función para obtener las tarjetas de un establecimiento
exports.getTarjetas = (request, response, next) => {
    const idEstablecimiento = request.query.establecimiento;

    console.log('idEstablecimiento:', idEstablecimiento); // Aquí agregas el console.log

    // Llamamos al método del modelo para obtener las tarjetas
    Tarjeta.obtenerPorEstablecimiento(idEstablecimiento)
        .then(([results]) => {
            // Renderiza la vista 'mis_versiones.ejs' y pasa las tarjetas como un objeto
            response.render('misVersiones', {
                tarjetas: results,
                pagePrimaryTitle: 'Mis Versiones',
                isLoggedIn: request.session.isLoggedIn || false,
                usuario: request.session.usuario || {}
            });
        })
        .catch(err => {
            return response.status(500).send('Error al obtener las tarjetas');
        });
};

exports.getRoot = (request, response, next) => {
    const isLoggedIn = request.session.isLoggedIn || false;
    if (!isLoggedIn) {
        return response.redirect('/usuario/login');
    }
    response.render('misTarjetas', {
        pagePrimaryTitle: 'Mis Tarjetas',
        isLoggedIn: isLoggedIn,
        usuario: request.session.usuario || {},
        sellos: 1
    });
};


exports.getConfig = (request, response, next) => {
    response.render('configuracion');
};

exports.getInfo = (request, response, next) => {
    const usuario = request.session.usuario;
    response.render('miInformacion', {
        pagePrimaryTitle: 'Mi Información',
        usuario: usuario,
        isLoggedIn: request.session.isLoggedIn || false,
    });
};

exports.getReportes = (request, response, next) => {
    response.render('Reportes');
};

exports.getEquipo = (request, response, next) => {
    response.render('miEquipo')
};

exports.getSucursales = (request, response, next) => {
    response.render("misSucursales")
};

exports.getClientes = async (request, response, next) => {
    try {
      const clientes = await Clientes.obtenerTodos();
      response.render('misClientes', { Clientes: clientes });
    } catch (err) {
      console.error(err);
      response.status(500).send({ message: 'Error al obtener clientes' });
    }
};

  exports.buscarClienteSearch = (request,response, next) => {
    const Telefono = request.query.SearchTarjeta;

    Clientes.buscarClienteSearch(Telefono).then(([results, fieldData]) => {
        const cliente = new Clientes(results[0].Telefono,results[0].Entidad,results[0].Genero,results[0].fecha_nacimiento,results[0].id_usuario);
        return response.render('misClientes', { Clientes: cliente });
    }).catch(err => {
        console.log(err);
        return response.status(500).send({ message: 'Error al buscar cliente' });
    });
};