const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main.controller');

router.get('/miInformacion', mainController.getRoot);

module.exports = router;