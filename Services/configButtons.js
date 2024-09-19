// Lógica para insertar datos
exports.insertarDatos = (req, res, next) => {
    const { tipo, valor } = req.body;

    // Lógica para insertar datos según el tipo (tarjeta, etapa, sellos)
    if (tipo === 'tarjeta') {
        // Insertar datos de tarjeta
        console.log(`Insertando tarjeta: ${valor}`);
    } else if (tipo === 'etapa') {
        // Insertar datos de etapa
        console.log(`Insertando etapa: ${valor}`);
    } else if (tipo === 'sellos') {
        // Insertar datos de sellos
        console.log(`Insertando sellos: ${valor}`);
    }
    
    // Redirige o responde con un mensaje de éxito
    res.redirect('/configuracion');
};

// Lógica para modificar datos
exports.modificarDatos = (req, res, next) => {
    const { tipo, valor } = req.body;

    // Lógica para modificar datos según el tipo
    if (tipo === 'tarjeta') {
        console.log(`Modificando tarjeta: ${valor}`);
    } else if (tipo === 'etapa') {
        console.log(`Modificando etapa: ${valor}`);
    } else if (tipo === 'sellos') {
        console.log(`Modificando sellos: ${valor}`);
    }

    res.redirect('/configuracion');
};

// Lógica para eliminar datos
exports.eliminarDatos = (req, res, next) => {
    const { tipo } = req.body;

    // Lógica para eliminar datos según el tipo
    if (tipo === 'tarjeta') {
        console.log(`Eliminando tarjeta`);
    } else if (tipo === 'etapa') {
        console.log(`Eliminando etapa`);
    } else if (tipo === 'sellos') {
        console.log(`Eliminando sellos`);
    }

    res.redirect('/configuracion');
};
