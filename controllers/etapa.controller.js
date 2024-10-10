const { request, response } = require('express');
const Etapa = require('../models/etapas.models');

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

// Crear Etapa
exports.crearEtapa = async (req, res, next) => {
  try {
    const { sellos_cantidad, compra_minima, descuento, nombre_producto } = req.body;

    console.log({ sellos_cantidad, compra_minima, descuento, nombre_producto });

    const [resProducto] = await Etapa.encontrarProducto(nombre_producto);
    const id_Producto = resProducto[0];
    const id_Etapa = '002';

    await Etapa.crearEtapa(sellos_cantidad, compra_minima, descuento, id_Producto);

    return res.render('crearEtapa');
  } catch (err) {
    console.error('Error al crear etapa:', err);
    return res.status(500).send({ message: 'Error al crear etapa' });
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
