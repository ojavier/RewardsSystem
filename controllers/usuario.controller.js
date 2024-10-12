const { response, request } = require('express');
const Usuario = require('../models/usuario.models');
const Establecimiento = require('../models/establecimientos.models');
const isAuth = require('../Util/is-auth');
const { v4: uuidv4 } = require('uuid'); 

// Método para manejar el GET de inicio de sesión
exports.getLogin = (req, res, next) => {
    const error = req.session.error || null;
    req.session.error = null; 
    const isLoggedIn = req.session.isLoggedIn || false;
  
    if (!isLoggedIn) {
        return res.render('login', {
            pagePrimaryTitle: 'Sistema de recompensas',
            isLoggedIn,
            permisos: req.session.permisos || [],
            usuario: req.session.usuario || {},
            error,
            establecimientos: [],
        });
    }
    return res.redirect(`${process.env.PATH_SERVER}/misTarjetas`);
};
  
// Método para manejar el POST de inicio de sesión
exports.postLogin = (req, res, next) => {
    const { telefono } = req.body;
    console.log('Iniciando sesión con teléfono:', telefono);
    req.session.error = null;

    Usuario.buscarPorTelefono(telefono)
        .then(([rows]) => {
            console.log('Resultado de la búsqueda:', rows);
            if (rows.length > 0) {
                req.session.isLoggedIn = true;
                req.session.usuario = rows[0];
                console.log('Usuario encontrado, redirigiendo a misTarjetas');

                return Establecimiento.buscarEstablecimientos(telefono)
                    .then(([establecimientos]) => {
                        console.log('Establecimientos:', establecimientos);
                        req.session.establecimientos = establecimientos;
                        return res.redirect(`${process.env.PATH_SERVER}/misTarjetas`);
                    })
                    .catch((err) => {
                        console.error('Error al buscar establecimientos:', err);
                        return res.status(500).send('Error al buscar establecimientos');
                    });
            }

            req.session.error = 'Número de teléfono no encontrado';
            console.log('Usuario no encontrado, redirigiendo a login');
            return res.redirect(`${process.env.PATH_SERVER}/usuario/login`);
        })
        .catch((err) => {
            console.error('Error al buscar el usuario:', err);
            req.session.error = 'Error interno del servidor';
            return res.redirect(`${process.env.PATH_SERVER}/usuario/login`);
        });
};

// Método para modificar un usuario
exports.modificarUsuario = (request, response, next) => {
    const { Nombre } = request.body;
    const { id_Usuario } = request.params; 
    
    if (!Nombre || !id_Usuario) {
        console.log('Datos recibidos para modificar', request.body);
        return response.status(400).send('Todos los campos son requeridos');
    }

    console.log('Datos recibidos para modificar', request.body);

    const nuevosDatos = { Nombre };

    Usuario.modificarUPorId(id_Usuario, nuevosDatos)
        .then(() => {
            return response.status(200).json({ 'mensaje': 'OK' });
        })
        .catch(err => {
            console.error('Error al modificar usuario:', err);
            return response.status(500).json({ 'mensaje': 'Internal server error' });
        });
};

// Controlador para registrar usuarios
exports.postRegistrar = (req, res, next) => {
    const { Nombre, Apellido, Telefono } = req.body;

    if (!Nombre || !Apellido || !Telefono) {
        req.session.error = 'Todos los campos son obligatorios';
        req.session.establecimientos = req.session.establecimientos || [];
        return res.redirect(`${process.env.PATH_SERVER}/registro`);
    }

    const id_Usuario = uuidv4();

    Usuario.registrar({ id_Usuario, Nombre, Apellido, Telefono })
        .then(() => {
            req.session.success = 'Usuario registrado con éxito';
            req.session.establecimientos = req.session.establecimientos || [];
            return res.redirect(`${process.env.PATH_SERVER}/usuario/login`);
        })
        .catch((err) => {
            console.error('Error al registrar el usuario:', err);
            req.session.error = 'Hubo un error al registrar el usuario';
            req.session.establecimientos = req.session.establecimientos || [];
            return res.redirect(`${process.env.PATH_SERVER}/registro`);
        });
};

// Renderizar el formulario de registro
exports.getRegistrar = (req, res, next) => {
    const error = req.session.error || null;
    req.session.error = null; // Limpiar error después de usarlo
    const establecimientos = req.session.establecimientos || [];

    return res.render('registro', {
        pagePrimaryTitle: 'Registro de Usuario',
        error,
        isLoggedIn: false,
        establecimientos,
    });
};
