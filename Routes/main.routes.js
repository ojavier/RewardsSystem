const express = require('express');
const router = express.Router();
const isAuth = require('../Util/is-auth');

const mainController = require('../controllers/main.controller');
const tarjetasController = require('../Controllers/tarjetas.controller');
const etapaController = require('../Controllers/etapa.controller');
const selloActualController = require("../controllers/selloActual.controller");
const usuarioController = require("../Controllers/usuario.controller");
const establecimientosController = require("../Controllers/establecimientos.controller");
const ordenesController = require("../Controllers/ordenes.controller")



router.get('/modificarEtapas', isAuth, mainController.getmodEtap);

router.get('/misVersiones', isAuth, tarjetasController.getTarjetas);

router.get('/misTarjetas', isAuth, mainController.getRoot);

router.get('/configuracion', isAuth, mainController.getConfig);

router.get('/miInformacion', isAuth, mainController.getInfo);

router.post('/registro', usuarioController.postRegistrar);

router.get('/registro', usuarioController.getRegistrar);

router.get('/reportes', isAuth, mainController.getReportes);

router.get('/miEquipo', isAuth, mainController.getEquipo);

router.get("/misSucursales", isAuth, mainController.getSucursales);

router.get("/misClientes", isAuth, mainController.getClientes);

router.get("/modificarTarjeta", isAuth, mainController.getmodTar)

// Rutas para Etapa
router.post('/etapa/modificar', isAuth, etapaController.modificarEtapa); // Modificar etapa
router.get('/etapa/:id_Etapa', isAuth, etapaController.buscarEtapa); // Buscar etapa por ID
router.get('/etapa/portarjeta', isAuth, etapaController.obtenerEtapasPorTarjeta); // Obtener etapas por tarjeta
router.post('/etapa/eliminar/:id_Etapa', isAuth, etapaController.eliminarEtapa); // Eliminar etapa de una tarjeta

//rutas para clientes
router.get("/clientes/buscar", isAuth, mainController.buscarClienteSearch);

router.post("/sello/registrar", isAuth, mainController.registrarSello);

//ruta para usuario
router.post("/usuario/modificar", isAuth, usuarioController.modificarUsuario);

//Rutas para Establecimientos
router.get("/establecimientos/buscar", isAuth, establecimientosController.buscarEstablecimientos);

//Rutas para Ordenes
router.post("/Orden/Registrar", isAuth, ordenesController.registrarOrden);

module.exports = router; 
