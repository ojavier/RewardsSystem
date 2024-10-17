const { request, response } = require('express');
const Etapa = require('../models/etapas.models');
const { v4: uuidv4 } = require('uuid');

// Buscar Etapa
exports.buscarEtapa = (req, res, next) => {
    const { id_Etapa } = req.params;

    console.log('Buscando etapa con ID:', id_Etapa);

    Etapa.buscarPorId(id_Etapa)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).send('Etapa no encontrada');
            }
            console.log('Etapa encontrada:', rows[0]);
            return res.status(200).json(rows[0]);
        })
        .catch((err) => {
            console.error('Error buscando etapa:', err);
            return res.status(500).send('Error al buscar etapa');
        });
};

// Modificar Etapa
exports.modificarEtapa = (req, res) => {
    const { id_Etapa, Cant_Sellos, Minimo_Compra, Descuento } = req.body;

    if (!id_Etapa || !Cant_Sellos || !Minimo_Compra || !Descuento) {
        console.log('Datos recibidos para modificar:', req.body);
        return res.status(400).send('Todos los campos son requeridos');
    }

    console.log('Datos recibidos para modificar:', req.body);

    const nuevosDatos = {
        Cant_Sellos,
        Minimo_Compra,
        Descuento,
    };

    Etapa.modificarPorId(id_Etapa, nuevosDatos)
        .then(() => res.status(200).json({ mensaje: 'OK' }))
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ mensaje: 'Internal server error' });
        });
};

// GET: Renderizar la página para crear una etapa
exports.getCrearEtapa = (req, res, next) => {
    try {
        // Renderizar solo la vista sin datos adicionales
        const establecimientos = req.session.establecimientos
        res.render("crearEtapa", {
            establecimientos: establecimientos,
            id_Establecimiento: req.session.establecimiento_id || '',
            notification: '',
            type: '',
        });
    } catch (err) {
        console.error('Error al preparar la página de creación de etapa:', err);
        res.status(500).send({
            message: "Error al preparar la página de creación de etapa."
        });
    }
};

// POST: Crear la nueva etapa en la base de datos
exports.postCrearEtapa = async (req, res, next) => {
    try {
        // Obtener los datos del formulario
        const { sellos_cantidad, compra_minima, descuento, nombre_producto } = req.body;

        // Validar que los campos estén completos
        if (!sellos_cantidad || !compra_minima || !descuento || !nombre_producto) {
            return res.status(400).send({
                message: 'Todos los campos son requeridos.'
            });
        }

        // Encontrar el ID del producto
        const [productoResult] = await Etapa.encontrarProducto(nombre_producto);

        if (productoResult.length === 0) {
            return res.status(404).send({
                message: 'Producto no encontrado.'
            });
        }

        const id_Producto = productoResult[0].id_Producto;

        // Generar un nuevo ID para la etapa
        const id_Etapa = uuidv4();

        console.log(id_Etapa)

        // Insertar la nueva etapa en la base de datos
        await Etapa.crearEtapa(id_Etapa, sellos_cantidad, compra_minima, descuento, id_Producto);

        // Confirmación de éxito
        const establecimientos = req.session.establecimientos
        res.render("crearEtapa", {
            establecimientos: establecimientos,
            id_Establecimiento: req.session.establecimiento_id || '',
            notification: 'Etapa creada exitosamente.',
            type: 'success',
        });

    } catch (err) {
        console.error('Error al crear la etapa:', err);
        res.status(500).send({
            message: "Error al crear la etapa."
        });
    }
};

// Obtener Etapas por Tarjeta
exports.obtenerEtapasPorTarjeta = (req, res, next) => {
    const { Telefono } = req.params;

    Etapa.buscarPorTarjeta(Telefono)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).send('No hay etapas para esta tarjeta');
            }
            return res.render('modificarEtapas', { etapas: rows });
        })
        .catch((err) => {
            console.error('Error al obtener etapas:', err);
            return res.status(500).send('Error al obtener etapas');
        });
};

// Eliminar Etapa
exports.eliminarEtapa = (req, res, next) => {
    const { id_Etapa } = req.params;

    Etapa.eliminarEtapa(id_Etapa)
        .then(() => res.status(200).send('Etapa eliminada correctamente'))
        .catch((err) => {
            console.error('Error al eliminar la etapa:', err);
            return res.status(500).send('Error al eliminar la etapa');
        });
};
