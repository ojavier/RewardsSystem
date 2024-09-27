const Usuario = require('../Models/usuario.models');

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
    }
};

// Método para manejar el POST de inicio de sesión
exports.postLogin = (request, response, next) => {
    const telefono = request.body.telefono; // Suponiendo que el teléfono viene en el cuerpo de la solicitud
    
    Usuario.buscarPorTelefono(telefono)
        .then(([rows]) => {
            if (rows.length > 0) {
                // El usuario fue encontrado, se inicia sesión
                request.session.isLoggedIn = true;
                request.session.usuario = rows[0];
                response.redirect('/dashboard'); // O cualquier página que siga al login
            } else {
                // Usuario no encontrado, mandar error
                request.session.error = 'Número de teléfono no encontrado';
                response.redirect('/login');
            }
        })
        .catch(err => {
            console.error(err);
            response.redirect('/login');
        });
};
