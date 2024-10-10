const { request, response } = require("express");
const Clientes = require('../Models/clientes.models');
const Sello = require("../Models/selloActual.models");
const Etapa = require('../models/etapas.models');
const Establecimiento = require("../Models/establecimientos.models");
const Usuario = require("../Models/usuario.models");

exports.getRoot = (request, response, next) => {
    const isLoggedIn = request.session.isLoggedIn || false;
    if (!isLoggedIn) {
        return response.redirect('/usuario/login');
    }
    response.render('misTarjetas', {
        pagePrimaryTitle: 'Mis Tarjetas',
        isLoggedIn: isLoggedIn,
        usuario: request.session.usuario || {},
        sellos: 1,
        establecimientos: request.session.establecimientos || [],
    });
};

exports.getEstablecimientos = (request, response, next) => {
    response.render('misEstablecimientos');
};

exports.getRegistro = (request, response, next) => {
    response.render('registro', {
        establecimientos: request.session.establecimientos || [],
    });
};

exports.getConfig = (request, response, next) => {
    response.render('configuracion', {
        establecimientos: request.session.establecimientos || [],
    });
};

exports.getInfo = (request, response, next) => {
    const usuario = request.session.usuario;
    response.render('miInformacion', {
        pagePrimaryTitle: 'Mi Información',
        usuario: usuario,
        isLoggedIn: request.session.isLoggedIn || false,
        establecimientos: request.session.establecimientos || [],
    });
};


exports.getmodEtap = (req, res, next) => {
    const telefono = req.params.telefono;

    Etapa.buscarPorTarjeta(telefono)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.render('modificarEtapas', { etapas: [] }); // Si no hay etapas, pasa un arreglo vacío
            }
            res.render('modificarEtapas', {
                etapas: rows,
                establecimientos: request.session.establecimientos || [],
            }); // Pasa las etapas a la vista
        })
        .catch(err => {
            console.log('Error al obtener etapas:', err);
            res.status(500).send('Error al obtener etapas');
        });
};

exports.getReportes = (request, response, next) => {
    response.render('Reportes', {
        establecimientos: request.session.establecimientos || [],
    });
};

exports.getEquipo = (request, response, next) => {
    response.render('miEquipo', {
        establecimientos: request.session.establecimientos || [],
    })
};

exports.getSucursales = (request, response, next) => {
    response.render("misSucursales", {
        establecimientos: request.session.establecimientos || [],
    })
};

exports.getmodTar = (request, response, next) => {
    response.render("modificarTarjeta", {
        establecimientos: request.session.establecimientos || [],
    })
};

exports.getClientes = async (request, response, next) => {
    try {
        const clientes = await Clientes.obtenerTodos();
        response.render('misClientes', {
            Clientes: clientes,
            notification: null,
            establecimientos: request.session.establecimientos || [],
        });
    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error al obtener clientes' });
    }
};

exports.buscarClienteSearch = (request, response, next) => {
    const Telefono = request.query.SearchTarjeta;

    Clientes.buscarClienteSearch(Telefono)
        .then(([results, fieldData]) => {
            if (results.length === 0) {
                return response.render("misClientes", {
                    Clientes: null,
                    error: "Cliente no encontrado",
                    notification: null,
                    establecimientos: request.session.establecimientos || [],
                });
            }

            const cliente = results[0];
            console.log(cliente);

            Clientes.buscarSellosCliente(Telefono)
                .then((results) => {
                    const sellos = results[0][0].cantidad_sellos;
                    console.log(results[0]);
                    console.log(results[0][0].cantidad_sellos);
                    return response.render("misClientes", {
                        Clientes: cliente,
                        sellos: sellos,
                        notification: null,
                        establecimientos: request.session.establecimientos || [],
                    });
                })

                .catch((err) => {
                    console.log(err);
                    return response.status(500).send({ message: "Error al buscar sellos del cliente" });
                });
        })

        .catch((err) => {
            console.log(err);
            return response.status(500).send({ message: 'Error al buscar cliente' });
        });
};

exports.registrarSello = async (request, response, next) => {
    try {
        console.log(request.body);
        console.log(request.session.usuario.Telefono);
        const TelefonoUsuario = request.session.usuario.Telefono;
        const TelefonoCliente = request.body.telefono;

        await Sello.registrarSelloTel(TelefonoCliente, TelefonoUsuario);

        const [results] = await Clientes.buscarClienteSearch(Telefono);
        const cliente = results[0];
        response.render('misClientes', {
            notification: 'Sello registrado correctamente',
            type: 'success',
            Clientes: cliente,
            establecimientos: request.session.establecimientos || [],
        });
    }
    catch (err) {
        console.error(err);
        response.status(500).send({ message: "Error al registrar Sello" })
    }
};

