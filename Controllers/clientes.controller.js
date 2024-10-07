const { request, response } = require('express');
const cliente = require('../Models/clientes.models');

exports.registrarCliente = (req, res) => {
    try {
        // Capturar los datos del cuerpo de la solicitud
        const Telefono = req.body.Telefono
        console.log(Telefono);
        const Entidad = req.body.Entidad;
        console.log(Entidad);
        const Genero = req.body.Genero;
        console.log(Genero);
        const fecha_nacimiento = req.body.fecha_nacimiento;
        console.log(fecha_nacimiento);

        // Validar que todos los campos tengan valores
        if (!Telefono || !Entidad || !Genero || !fecha_nacimiento) {
            return res.status(400).send({
                message: "Todos los campos son obligatorios"
            });
        }

        // Registrar el cliente en la base de datos
        cliente.registrarCliente(Telefono, Entidad, Genero, fecha_nacimiento)
            .then(() => {
                res.status(201).send({
                    message: "Cliente registrado exitosamente"
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({
                    message: "Error al registrar cliente"
                });
            });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Error en el servidor"
        });
    }
};