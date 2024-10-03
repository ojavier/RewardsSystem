const express = require('express');
const router = express.Router();
const isAuth = require('../Util/is-auth');

const mainController = require('../controllers/main.controller');
// const tarjetasController = require('../Controllers/tarjetas.controller');
const etapaController = require('../Controllers/etapa.controller');
const selloActualController = require("../controllers/selloActual.controller");
const clienteController = require('../Controllers/cliente.controller');

router.get('/misClientes', clienteController.buscarClientePorTelefono);

router.get('/misVersiones', isAuth, mainController.getTarjetas);

router.get('/misTarjetas', isAuth, mainController.getRoot);

router.get('/configuracion', isAuth, mainController.getConfig);

router.get('/miInformacion', isAuth, mainController.getInfo);

router.get('/reportes', isAuth, mainController.getReportes);

router.get('/miEquipo', isAuth, mainController.getEquipo);

router.get("/misSucursales", isAuth, mainController.getSucursales);

router.get("/misClientes", isAuth, mainController.getClientes);

// Rutas para Etapa
router.post('/etapa/modificar', isAuth, etapaController.modificarEtapa); // Modificar etapa
router.get('/etapa/:id_Etapa', isAuth, etapaController.buscarEtapa); // Buscar etapa por ID

router.get("/mostrar-Sellos/:Telefono", isAuth, selloActualController.mostrarSellos);
module.exports = router; 