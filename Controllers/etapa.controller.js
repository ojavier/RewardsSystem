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

//Crea una nueva etapa
exports.crearEtapa = async (req, res, next) => {
    try {
        const sellos_cantidad = req.body.sellos_cantidad
        console.log(sellos_cantidad);
        const compra_minima = req.body.compra_minima
        console.log(compra_minima);
        const descuento = req.body.descuento
        console.log(descuento);
        const nombre_producto = req.body.nombre_producto
        console.log(nombre_producto);
        const [resProducto] = await Etapa.encontrarProducto(nombre_producto);
        console.log(resProducto);
        const id_Producto = resProducto[0];
        console.log(id_Producto);
        const id_Etapa = '002'
        Etapa.crearEtapa(sellos_cantidad, compra_minima, descuento, id_Producto);
        response.render("crearEtapa");
    }
    catch (err) {
        console.error(err);
        response.status(500).send({
            message: "Error al crear etapa"
        })
    }
}

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
