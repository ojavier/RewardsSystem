const Etapa = require('../models/etapas.models');

exports.modificarEtapa = (req, res, next) => {
    const { id_Etapa, Cant_Sellos, Minimo_Compra, Descuento, id_Producto } = req.body;
    const nuevosDatos = { Cant_Sellos, Minimo_Compra, Descuento, id_Producto };

    Etapa.modificarPorId(id_Etapa, nuevosDatos)
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).send('Etapa no encontrada');
            }
            res.status(200).send('Etapa modificada exitosamente');
        })
        .catch(err => {
            console.log('Error modificando etapa:', err);
            res.status(500).send('Error al modificar etapa');
        });
};

exports.buscarEtapa = (req, res, next) => {
    
};
