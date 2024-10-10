const { response, request } = require('express');
const Usuario = require('../Models/usuario.models');
const Establecimiento = require('../Models/establecimientos.models');
const isAuth = require('../Util/is-auth');
const { v4: uuidv4 } = require('uuid'); 


exports.getLogin = (request, response, next) => {
    const error = request.session.error || null;
    const isLoggedIn = request.session.isLoggedIn || false;
    const establecimientos = request.session.establecimientos || [];

    if (!isLoggedIn) {
        response.render('login', {
            pagePrimaryTitle: 'Sistema de recompensas',
            isLoggedIn: isLoggedIn,
            permisos: request.session.permisos || [],
            usuario: request.session.usuario || {},
            error: error,
            establecimientos: establecimientos || [],
        });
    } else {
        response.redirect('/misTarjetas');
    }
};

// Método para manejar el POST de inicio de sesión
exports.postLogin = (request, response, next) => {
    const telefono = request.body.telefono;

    console.log('Iniciando sesión con teléfono:', telefono);

    // Limpiar errores previos
    request.session.error = null;

    Usuario.buscarPorTelefono(telefono)
        .then(([rows]) => {
            console.log('Resultado de la búsqueda:', rows); // Mostrar resultados

            if (rows.length > 0) {
                // Usuario encontrado, iniciar sesión
                request.session.isLoggedIn = true;
                request.session.usuario = rows[0];
                console.log('Usuario encontrado, redirigiendo a misTarjetas');

                Establecimiento.buscarEstablecimientos(telefono).then(([establecimientos, fieldData]) => {
                    console.log(fieldData);
                    console.log(establecimientos);
                    request.session.establecimientos = establecimientos;
                    return response.redirect('/misTarjetas');
                    
                }).catch((err) => {
        
                    console.error(err);
                    response.status(500).send('Error al buscar establecimientos');
                });


            } else {
                // Usuario no encontrado
                request.session.error = 'Número de teléfono no encontrado';
                console.log('Usuario no encontrado, redirigiendo a login');
                return response.redirect('/usuario/login');
            }
        })
        .catch(err => {
            console.error('Error al buscar el usuario:', err);
            request.session.error = 'Error interno del servidor';
            return response.redirect('/usuario/login');
        });
    
};

exports.modificarUsuario = (request, response, next) => {
    const { Nombre } = request;
    
    if (!Nombre) {
        console.log('Datos recibidos para modificar', request.body);
        return response.status(400).send('Todos los campos son requeridos');
    }

    console.log('Datos recibidos para modificar', request.body);

    const nuevosDatos = {
        Nombre
    };

    Usuarios.modificarUPorId(id_Usuario, nuevosDatos).then(() => {

        return response.status(200).json({ 'mensaje': 'OK' });
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ 'mensaje': 'Internal server error'});
    });
    

};

// Controlador para registrar usuarios
exports.postRegistrar = (req, res, next) => {
    const { Nombre, Apellido, Telefono } = req.body;

    // Validar que los datos estén completos
    if (!Nombre || !Apellido || !Telefono) {
        req.session.error = 'Todos los campos son obligatorios';
        return res.redirect('/registro', {
            establecimientos: request.session.establecimientos || [],
        });  // Asegúrate de que la ruta sea correcta
    }

    // Generar un id único para el usuario usando UUID v4
    const id_Usuario = uuidv4();

    // Registrar el nuevo usuario
    Usuario.registrar({ id_Usuario, Nombre, Apellido, Telefono })
        .then(() => {
            req.session.success = 'Usuario registrado con éxito';
            res.redirect('/usuario/login', {
                establecimientos: request.session.establecimientos || [], 
            });  // Redirige al login tras registrarse
        })
        .catch(err => {
            console.error('Error al registrar el usuario:', err);
            req.session.error = 'Hubo un error al registrar el usuario';
            res.redirect('/registro', {
                establecimientos: request.session.establecimientos || [], 
            });  // Asegúrate de que la ruta sea correcta
        });
};

// Renderizar el formulario de registro
exports.getRegistrar = (req, res, next) => {
    const error = req.session.error || null;
    console.log(request.session.establecimientos);

    res.render('registro', {
        pagePrimaryTitle: 'Registro de Usuario',
        error: error,
        isLoggedIn: false ,
        establecimientos: request.session.establecimientos || [],  // El usuario no está logueado en la pantalla de registro
    });
};
