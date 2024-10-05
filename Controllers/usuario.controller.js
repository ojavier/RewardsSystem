const { response, request } = require('express');
const Usuario = require('../Models/usuario.models');
const isAuth = require('../Util/is-auth');


exports.getLogin = (request, response, next) => {
    const error = request.session.error || null;
    const isLoggedIn = request.session.isLoggedIn || false;

    if (!isLoggedIn) {
        response.render('login', {
            pagePrimaryTitle: 'Sistema de recompensas',
            isLoggedIn: isLoggedIn,
            permisos: request.session.permisos || [],
            usuario: request.session.usuario || {},
            error: error
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
                return response.redirect('/misTarjetas');
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


