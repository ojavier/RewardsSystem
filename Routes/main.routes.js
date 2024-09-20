const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main.controller');
const etapaController = require('../Controllers/etapa.controller');
const selloController = require("../controllers/sello.controller");


router.get('/login', mainController.getLogin);

router.get('/login', mainController.getLogin);

router.get('/misTarjetas', mainController.getRoot);

router.get('/configuracion', mainController.getConfig);

router.get('/miInformacion', mainController.getInfo);

router.get('/reportes', mainController.getReportes);

router.get('/miEquipo', mainController.getEquipo);

router.post('/etapa/modificar', etapaController.modificarEtapa); // Esta ruta ya está bien.
router.get('/etapa/:id_Etapa', etapaController.buscarEtapa); // Esta ruta debe corresponder a un método buscarEtapa en el controlador.
router.post("/registrar-sello",selloController.registrarSello) // Ruta para registrar sello

module.exports = router;