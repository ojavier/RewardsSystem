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
exports.getCrearEtapa = async (req, res, next) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const sellos_cantidad = req.query.sellos_cantidad;
        const compra_minima = req.query.compra_minima;
        const descuento = req.query.descuento;
        const nombre_producto = req.query.nombre_producto;

        // Validar que los datos estén completos y sean válidos
        if (!sellos_cantidad || isNaN(sellos_cantidad) || !compra_minima || isNaN(compra_minima) || !descuento || isNaN(descuento) || !nombre_producto) {
            return res.status(400).send({
                message: 'Todos los campos son requeridos y deben ser válidos.'
            });
        }

        console.log('Datos recibidos para crear etapa:', {
            sellos_cantidad,
            compra_minima,
            descuento,
            nombre_producto
        });

        // Encontrar el ID del producto basado en el nombre del producto
        const [resProducto] = await Etapa.encontrarProducto(nombre_producto);

        // Si no se encuentra el producto, devolver un error
        if (resProducto.length === 0) {
            return res.status(404).send({
                message: 'Producto no encontrado.'
            });
        }

        const id_Producto = resProducto[0].id_Producto;
        console.log('ID del producto encontrado:', id_Producto);

        // Renderizar la página con los productos y campos
        res.render("crearEtapa", {
            notification: '',
            type: '',
            sellos_cantidad,
            compra_minima,
            descuento,
            nombre_producto,
            id_Producto
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
        // Obtener los datos del cuerpo de la solicitud
        const { sellos_cantidad, compra_minima, descuento, id_Producto } = req.body;

        // Validar que los datos estén completos
        if (!sellos_cantidad || !compra_minima || !descuento || !id_Producto) {
            return res.status(400).send({
                message: 'Todos los campos son requeridos.'
            });
        }

        // Generar un nuevo id_Etapa
        const id_Etapa = uuidv4();
        console.log('ID de la etapa generado:', id_Etapa);

        // Crear la nueva etapa en la base de datos
        await Etapa.crearEtapa(id_Etapa, sellos_cantidad, compra_minima, descuento, id_Producto);

        // Renderizar la vista de confirmación
        res.render("crearEtapa", {
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
