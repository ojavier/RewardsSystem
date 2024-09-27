const express = require('express');
const router = express.Router();
const isAuth = require('../Util/is-auth');

const mainController = require('../controllers/main.controller');
const etapaController = require('../Controllers/etapa.controller');
const selloController = require("../controllers/sello.controller");
const selloActualController = require("../controllers/selloActual.controller");


router.get('/misTarjetas', isAuth, mainController.getRoot);

router.get('/configuracion', isAuth, mainController.getConfig);

router.get('/miInformacion', isAuth, mainController.getInfo);

router.get('/reportes', isAuth, mainController.getReportes);

router.get('/miEquipo', isAuth, mainController.getEquipo);

// Rutas para Etapa
router.post('/etapa/modificar', isAuth, etapaController.modificarEtapa); // Modificar etapa
router.get('/etapa/:id_Etapa', isAuth, etapaController.buscarEtapa); // Buscar etapa por ID
router.get("/misSucursales", mainController.getSucursales);

router.post("/registrar-sello",selloController.registrarSello) // Ruta para registrar sello
router.get("/mostrar-Sellos/:Telefono",selloActualController.mostrarSellos)
module.exports = router; 