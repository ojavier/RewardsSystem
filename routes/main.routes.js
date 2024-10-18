const express = require('express');
const router = express.Router();
const isAuth = require('../Util/is-auth');

const mainController = require('../controllers/main.controller');
const tarjetasController = require('../controllers/tarjetas.controller');
const etapaController = require('../controllers/etapa.controller');
const selloActualController = require("../controllers/selloActual.controller");
const usuarioController = require("../controllers/usuario.controller");
const establecimientosController = require("../controllers/establecimientos.controller");
const ordenesController = require("../controllers/ordenes.controller");
const reportesController = require('../controllers/reportes.controller');
const sucursalesController = require("../controllers/sucursales.controller");


router.get('/crearTarjeta', isAuth, tarjetasController.getCrearTarjeta)

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

router.get("/misEstablecimientos", isAuth, establecimientosController.getLocalizaciones);

router.get("/modificarTarjeta", isAuth, mainController.getmodTar);

// Rutas para Etapa
router.post('/etapa/modificar', isAuth, etapaController.modificarEtapa); // Modificar etapa
router.get('/etapa/:id_Etapa', isAuth, etapaController.buscarEtapa); // Buscar etapa por ID
router.get('/etapa/portarjeta', isAuth, etapaController.obtenerEtapasPorTarjeta); // Obtener etapas por tarjeta
router.post('/etapa/eliminar/:id_Etapa', isAuth, etapaController.eliminarEtapa); // Eliminar etapa de una tarjeta

//Rutas para clientes
router.get("/clientes/buscar", isAuth, mainController.buscarClienteSearch);

//Rutas para Sellos
router.post("/sello/registrar", isAuth, mainController.registrarSello);

//Ruta para usuario
router.post("/usuario/modificar", isAuth, usuarioController.modificarUsuario);

//Rutas para Establecimientos
router.post("/establecimientos/cambiar", isAuth, establecimientosController.cambiarEstablecimiento);

//Rutas para Ordenes
router.post("/Orden/Registrar", isAuth, ordenesController.registrarOrden);

//Rutas para Reportes
router.get('/reportes/topTenderos', reportesController.getTopTenderos);

router.get('/reportes/sellosPorHora', reportesController.getSellosPorHora);

router.get('/reportes/sellosPorDia', reportesController.getSellosPorDia);

router.get('/reportes/topClientesSellos', reportesController.getTopClientesSellos);

//rutas para sucursal
router.post("/sucursal/searchBar", isAuth, sucursalesController.getSucursalesSearchBar);

router.post("/sucursal/modificar", isAuth, sucursalesController.sucursalModificar);

router.post("/sucursal/eliminar", isAuth, sucursalesController.eliminarSucursal);

router.post("/sucursal/crear", sucursalesController.crearSucursal);


module.exports = router; 
