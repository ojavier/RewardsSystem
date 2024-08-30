const express = require('express');
const router = express.Router();

const mainController = require('../Controllers/main.controller');

router.get('/reportes', mainController.getRoot);

module.exports = router;