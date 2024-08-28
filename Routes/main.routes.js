const express = require('express');
const router = express.Router();

const mainController = require('../Controllers/main.controller');

router.get('/', mainController.getRoot);

module.exports = router;