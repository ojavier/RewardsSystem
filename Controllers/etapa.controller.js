const Etapa = require('../models/etapas.models');

exports.buscarEtapa = (req, res, next) => {
    const { id_Etapa } = req.params; // Obtener el id_Etapa de los parámetros

    // Agregar un console.log para verificar el id_Etapa
    console.log('Buscando etapa con ID:', id_Etapa);

    Etapa.buscarPorId(id_Etapa)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).send('Etapa no encontrada');
            }
            console.log('Etapa encontrada:', rows[0]); // Agregar un console.log para ver la etapa encontrada
            res.status(200).json(rows[0]); // Devolver la primera coincidencia
        })
        .catch(err => {
            console.log('Error buscando etapa:', err);
            res.status(500).send('Error al buscar etapa');
        });
};

// Modificar Etapa
exports.modificarEtapa = (req, res) => {
    const { id_Etapa, Cant_Sellos, Minimo_Compra, Descuento } = req.body;

    if (!id_Etapa || !Cant_Sellos || !Minimo_Compra || !Descuento) {
        console.log('Datos recibidos para modificar:', req.body);
        return res.status(400).send('Todos los campos son requeridos');
    }

    // Verificar que los datos están siendo recibidos correctamente
    console.log('Datos recibidos para modificar:', req.body);

    const nuevosDatos = {
        Cant_Sellos,
        Minimo_Compra,
        Descuento,
    };

    Etapa.modificarPorId(id_Etapa, nuevosDatos)
        .then(([result]) => {
            // Verificar el resultado de la actualización
            console.log('Resultado de la actualización:', result);

            if (result.affectedRows === 0) {
                return res.status(404).send('Etapa no encontrada');
            }
            res.status(200).send('Etapa modificada exitosamente');
        })
        .catch(err => {
            console.log('Error modificando etapa:', err); // Capturar y mostrar el error
            res.status(500).send('Error al modificar etapa');
        });
};

exports.crearEtapa = (req, res) => {
    const { id } = req.params; // ID de la tarjeta
    const { nombreEtapa, descripcionEtapa } = req.body;

    // Crear una nueva etapa asociada a la tarjeta
    Etapa.create({ nombre: nombreEtapa, descripcion: descripcionEtapa, tarjetaId: id })
        .then(() => res.redirect('/configuracion'))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error al crear etapa');
        });
};

exports.buscarEtapa = (req, res) => {
    const { id_Etapa } = req.params;

    // Lógica para buscar una etapa por su ID
    Etapa.buscarPorId(id_Etapa)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).send('Etapa no encontrada');
            }
            res.status(200).json(rows[0]);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error al buscar etapa');
        });
};

// Función para modificar una etapa
exports.modificarEtapa = (req, res) => {
    const { id_Etapa, Cant_Sellos, Minimo_Compra, Descuento } = req.body;

    if (!id_Etapa || !Cant_Sellos || !Minimo_Compra || !Descuento) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    const nuevosDatos = {
        Cant_Sellos,
        Minimo_Compra,
        Descuento,
    };

    Etapa.modificarPorId(id_Etapa, nuevosDatos)
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).send('Etapa no encontrada');
            }
            res.status(200).send('Etapa modificada exitosamente');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error al modificar etapa');
        });
};