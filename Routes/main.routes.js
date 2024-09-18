const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main.controller');

router.get('/misTarjetas', mainController.getRoot);

router.get('/miInformacion', mainController.getInfo);

router.get('/reportes', mainController.getReportes);

router.get('/miEquipo', mainController.getEquipo);

module.exports = router;