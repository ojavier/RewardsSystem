const { request, response } = require('express');
const cliente = require('../Models/clientes.models');

exports.registrarCliente = (req, res) => {
    try {
        const Telefono = req.body.Telefono
        console.log(Telefono);
        const Entidad = req.body.Entidad
        console.log(Entidad);
        const Genero = req.body.Genero
        console.log(Genero);
        const fecha_nacimiento = req.body.fecha_nacimiento
        console.log(fecha_nacimiento);
    }
    catch (err) {
        console.error(err);
        response.status(500).send({
            message: "Error al crear etapa"
        })
    }
}