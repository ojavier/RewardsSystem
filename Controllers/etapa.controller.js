const { request, response } = require('express');
const Etapa = require('../models/etapas.models');
const { v4: uuidv4 } = require('uuid');

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

    Etapa.modificarPorId(id_Etapa, nuevosDatos).then(() => {

        return res.status(200).json({ 'mensaje': 'OK' });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ 'mensaje': 'Internal server error' });
    });
};

exports.crearEtapa = async (req, res, next) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const sellos_cantidad = req.body.sellos_cantidad;
        const compra_minima = req.body.compra_minima;
        const descuento = req.body.descuento;
        const nombre_producto = req.body.nombre_producto;

        // Validar que los datos estén completos
        if (!sellos_cantidad || !compra_minima || !descuento || !nombre_producto) {
            return res.status(400).send({
                message: 'Todos los campos son requeridos.'
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

        // Generar un nuevo id_Etapa
        const id_Etapa = uuidv4();
        console.log('ID de la etapa generado:', id_Etapa);

        // Crear la nueva etapa en la base de datos
        await Etapa.crearEtapa(id_Etapa, sellos_cantidad, compra_minima, descuento, id_Producto);

        // Renderizar la vista de confirmación
        res.render("crearEtapa", { message: 'Etapa creada exitosamente.' });
    } catch (err) {
        console.error('Error al crear la etapa:', err);
        res.status(500).send({
            message: "Error al crear la etapa."
        });
    }
};

//Obtener la etapa por medio de la tarjeta
exports.obtenerEtapasPorTarjeta = (req, res, next) => {
    const { Telefono } = req.params

    Etapa.buscarPorTarjeta(Telefono)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).send('No hay etapas para esta tarjeta');
            }
            res.render('modificarEtapas', { etapas: rows });
        })
        .catch(err => {
            console.log('Error al obtener etapas:', err);
            res.status(500).send('Error al obtener etapas');
        });
}

//Elimina una etapa de una tarjeta
exports.eliminarEtapa = (req, res, next) => {
    const { id_Etapa } = req.params;

    Etapa.eliminarEtapa(id_Etapa)
        .then(() => {
            // Redirigir o enviar una respuesta una vez que la etapa ha sido "eliminada" correctamente
            res.status(200).send('Etapa eliminada correctamente');
        })
        .catch(err => {
            console.log('Error al eliminar la etapa:', err);
            res.status(500).send('Error al eliminar la etapa');
        });
};
