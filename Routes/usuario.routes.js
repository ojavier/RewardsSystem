const express = require('express');
const router = express.Router();
const isAuth = require('../Util/is-auth');

const usuarioController = require('../controllers/usuario.controller');

router.get('/login', usuarioController.getLogin);
router.post('/login', usuarioController.postLogin);

module.exports = router;
