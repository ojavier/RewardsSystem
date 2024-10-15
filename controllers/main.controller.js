const { request, response } = require("express");
const Clientes = require('../models/clientes.models');
const Sello = require("../models/selloActual.models");
const Etapa = require('../models/etapas.models');
const Establecimiento = require("../models/establecimientos.models");
const Usuario = require("../models/usuario.models");
const Sucursales = require("../models/sucursales.models")

exports.getRoot = (request, response, next) => {
    const isLoggedIn = request.session.isLoggedIn || false;
    if (!isLoggedIn) {
        return response.redirect('${process.env.PATH_SERVER}usuario/login');
    }
    response.render('misTarjetas', {
        pagePrimaryTitle: 'Mis Tarjetas',
        isLoggedIn: isLoggedIn,
        usuario: request.session.usuario || {},
        sellos: 1,
        establecimientos: request.session.establecimientos || [],
        id_Establecimiento: request.query.id_Establecimiento || [],
    });
};

exports.getEstablecimientos = (request, response, next) => {
    response.render('misEstablecimientos');
};

exports.getRegistro = (request, response, next) => {
    response.render('registro', {
        establecimientos: request.session.establecimientos || [],
        id_Establecimiento: request.query.id_Establecimiento || [],
    });
};

exports.getConfig = (request, response, next) => {
    response.render('configuracion', {
        establecimientos: request.session.establecimientos || [],
        id_Establecimiento: request.query.id_Establecimiento || [],
    });
};

exports.getInfo = (request, response, next) => {
    const usuario = request.session.usuario;
    response.render('miInformacion', {
        pagePrimaryTitle: 'Mi Información',
        usuario: usuario,
        isLoggedIn: request.session.isLoggedIn || false,
        establecimientos: request.session.establecimientos || [],
        id_Establecimiento: request.query.id_Establecimiento || [],
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
                id_Establecimiento: request.query.id_Establecimiento || [],
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
        id_Establecimiento: request.query.id_Establecimiento || [],
    });
};

exports.getEquipo = (request, response, next) => {
    response.render('miEquipo', {
        establecimientos: request.session.establecimientos || [],
        id_Establecimiento: request.query.id_Establecimiento || [],
    })
};

exports.getSucursales = async (request, response, next) => {
    const id_Usuario = request.session.usuario.id_Usuario;
    const id_Establecimiento = request.query.establecimiento;
    console.log("GET Sucursales");
    console.log(request.body);
    console.log(id_Usuario);
    console.log(request.query.establecimiento);
    console.log(request.session);
    Sucursales.getSucursales(id_Usuario, id_Establecimiento).then(([sucursales, fieldData]) => {
        establecimientos = request.session.establecimientos;
        return response.render("misSucursales", {
            establecimientos: establecimientos || [],
            sucursales: sucursales || [],
            id_Establecimiento: request.query.id_Establecimiento || [],
        })

    }).catch(err => {console.log(err)})
};

exports.getmodTar = (request, response, next) => {
    response.render("modificarTarjeta", {
        establecimientos: request.session.establecimientos || [],
        id_Establecimiento: request.query.id_Establecimiento || [],
    })
};

exports.getClientes = async (request, response, next) => {
    try {
        const clientes = await Clientes.obtenerTodos();
        response.render('misClientes', {
            Clientes: clientes,
            notification: null,
            establecimientos: request.session.establecimientos || [],
            id_Establecimiento: request.query.id_Establecimiento || [],
        });
    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error al obtener clientes' });
    }
};

//Busca cliente por teléfono
exports.buscarClienteSearch = (request, response, next) => {
    const Telefono = request.query.SearchTarjeta;
    //Metodo de clase cliente que hace la query de busqueda
    Usuario.buscarClienteSearch(Telefono)
        .then(([results, fieldData]) => {
            if (results.length === 0) {
                return response.render("misClientes", {
                    Clientes: null,
                    error: "Cliente no encontrado",
                    notification: null,
                    establecimientos: request.session.establecimientos || [],
                    id_Establecimiento: request.query.id_Establecimiento || [],
                });
            }

            const cliente = results[0];
            console.log(cliente);
            // Método para buscar los sellos del cliente
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
                        id_Establecimiento: request.query.id_Establecimiento || [],
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

//Registra Sello en base de datos
exports.registrarSello = async (request, response, next) => {
    try {
        console.log(request.body);
        console.log(request.session.usuario.Telefono);
        const TelefonoUsuario = request.session.usuario.Telefono;
        const TelefonoCliente = request.body.telefono;
        //Llama el método de la clase de sellos
        await Sello.registrarSelloTel(TelefonoCliente, TelefonoUsuario);
        //Vuelve a buscar el cliente por el Telefono
        const [results] = await Usuario.buscarClienteSearch(TelefonoCliente);
        const cliente= results[0];
        //Renderiza vista mis clientes con información
        response.render('misClientes', {
            notification: 'Sello registrado correctamente',
            type: 'success',
            Clientes: cliente,
            establecimientos: request.session.establecimientos || [],
            id_Establecimiento: request.query.id_Establecimiento || [],
        });
    }
    catch (err) {
        console.error(err);
        response.status(500).send({ message: "Error al registrar Sello" })
    }
};
