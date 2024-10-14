const express = require('express');
const router = express.Router();
const isAuth = require('../Util/is-auth');

const etapaController = require('../controllers/etapa.controller');

router.get('/get/crear', isAuth, etapaController.getCrearEtapa);
router.post('/post/crear', isAuth, etapaController.postCrearEtapa);

module.exports = router;