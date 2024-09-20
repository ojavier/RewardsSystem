const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main.controller');
const etapaController = require('../Controllers/etapa.controller'); 


router.get('/login', mainController.getLogin);

router.get('/misTarjetas', mainController.getRoot);

router.get('/configuracion', mainController.getConfig);

router.get('/miInformacion', mainController.getInfo);

router.get('/reportes', mainController.getReportes);

router.get('/miEquipo', mainController.getEquipo);

// Rutas para Etapa
router.post('/etapa/modificar', etapaController.modificarEtapa); // Modificar etapa
router.get('/etapa/:id_Etapa', etapaController.buscarEtapa); // Buscar etapa por ID


module.exports = router;