const { request, response } = require("express");
const Clientes = require('../Models/clientes.models');
const Sello = require("../Models/selloActual.models");

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

exports.getRegistro = (request, response, next) => {
    response.render('registro');
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

exports.getcrearEtap = (request, response, next) => {
    response.render('crearEtapa')
};

exports.getmodEtap = (request, response, next) => {
    response.render('modificarEtapas')
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

exports.getmodTar = (request, response, next) => {
    response.render("modificarTarjeta")
};

exports.getClientes = async (request, response, next) => {
    try {
        const clientes = await Clientes.obtenerTodos();
        response.render('misClientes', { Clientes: clientes, notification: null });
    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error al obtener clientes' });
    }
};

exports.buscarClienteSearch = (request, response, next) => {
    const Telefono = request.query.SearchTarjeta;

    Clientes.buscarClienteSearch(Telefono)
        .then(([results, fieldData]) => {
            if (results.length === 0){
                return response.render("misClientes", { Clientes: null, error: "Cliente no encontrado", notification: null});
            }

            const cliente = results[0];
            console.log(cliente);

            Clientes.buscarSellosCliente(Telefono)
            .then((results) => {
                const sellos = results[0][0].cantidad_sellos;
                console.log(results[0]);
                console.log(results[0][0].cantidad_sellos);
                return response.render("misClientes", { Clientes:cliente, sellos: sellos, notification: null });
            })

            .catch((err) => {
                console.log(err);
                return response.status(500).send({ message: "Error al buscar sellos del cliente"});
            });
        })

        .catch((err) => {
            console.log(err);
            return response.status(500).send({ message: 'Error al buscar cliente' });
        });
};

exports.registrarSello = async (request,response, next) => {
    try{
        console.log(request.body)
        const Telefono = request.body.telefono;
        await Sello.registrarSelloTel(Telefono);

        const [results] = await Clientes.buscarClienteSearch(Telefono);
        const cliente= results[0];
        response.render('misClientes', { notification: 'Sello registrado correctamente', type: 'success', Clientes: cliente});
    }
    catch(err) {
        console.error(err);
        response.status(500).send({message: "Error al registrar Sello"})
    }
};

