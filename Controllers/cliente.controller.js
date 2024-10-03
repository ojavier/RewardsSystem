const Cliente = require('../models/cliente.model');

exports.getClientes = (request, response, next) => {
    const telefono = request.query.telefono;

    if (!telefono) {
        // Si no hay un número de teléfono en la búsqueda
        return response.render('misClientes', {
            cliente: null
        });
    }

    // Llamar al modelo para buscar el cliente
    Cliente.buscarPorTelefono(telefono)
        .then(([result]) => {
            if (result.length > 0) {
                const cliente = result[0];
                // Renderizar la vista con los datos del cliente
                response.render('misClientes', {
                    cliente: cliente
                });
            } else {
                // Si no se encuentra el cliente
                response.render('misClientes', {
                    cliente: null
                });
            }
        })
        .catch(err => {
            console.log(err);
            response.status(500).send('Error al buscar cliente');
        });
};
