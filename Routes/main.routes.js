const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main.controller');

router.get('/misTarjetas', mainController.getRoot);

router.get('/miInformacion', mainController.getInfo);

router.get('/reportes', mainController.getReportes);

module.exports = router;