const express = require('express');
const router = express.Router();

const mainController = require('../Controllers/main.controller');

router.get('/miInformacion', mainController.getInfo);

router.get('/reportes', mainController.getReportes);

module.exports = router;