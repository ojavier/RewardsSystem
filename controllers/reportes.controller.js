const { request, response } = require('express');
const Reportes = require('../models/reportes.models'); // Asegúrate de que la ruta sea correcta

// Controlador para Top Tenderos
exports.getTopTenderos = async (req, res) => {
    try {
        // Obtener el top tenderos
        const [tenderos] = await Reportes.obtenerTopTenderos();

        // Devolver los datos en formato JSON
        console.log(tenderos);
        res.json(tenderos);
    } catch (error) {
        console.error('Error al obtener los tenderos: ', error);
        res.status(500).json({ message: 'Error al obtener los datos de los tenderos' });
    }
};

// Controlador para Sellos por hora
exports.getSellosPorHora = async (req, res) => {
    try {
        // Obtener los datos de sellos por hora
        const [sellosPorHora] = await Reportes.obtenerSellosPorHora();

        // Revisar el formato de sellosPorHora
        console.log("Datos enviados al cliente:", sellosPorHora);

        // Devolver los datos en formato JSON
        res.json(sellosPorHora);
    } catch (error) {
        console.error('Error al obtener los sellos por hora: ', error);
        res.status(500).json({ message: 'Error al obtener los datos de sellos por hora' });
    }
};
//Controlador sellos por dia
exports.getSellosPorDia = async (request, response) => {
    try {
        //Obtiene sellos por dia
        const [sellosPorDia] = await Reportes.obtenerTopDiasSellos();
        //Devuelve en json
        response.json(sellosPorDia);
    }
    catch (error) {
        console.error('Error al obtener los sellos por dia: ', error);
        res.status(500).json({
            message: 'Error al obtener los datos de sellos por dia'
        });
    }

};

exports.getTopClientesSellos = async (req, res) => {
    try {
        // Llama al modelo para obtener el top de clientes con más sellos
        const [topClientes] = await Reportes.obtenerTopClientesSellos();

        //Devuelve en json
        res.json(topClientes)
    }
    catch (error) {
        console.error('Error al obtener el reporte de top clientes con más sellos:', error);
        res.status(500).send('Error interno del servidor');
    }
};