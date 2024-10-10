const express = require('express');
const router = express.Router();
const isAuth = require('../Util/is-auth');

const usuarioController = require('../Controllers/usuario.controller');

router.post('/login', usuarioController.postLogin);
router.get('/login', usuarioController.getLogin);

module.exports = router;
