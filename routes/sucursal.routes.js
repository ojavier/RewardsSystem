const express = require('express');
const router = express.Router();
const isAuth = require('../Util/is-auth');

sucursalesController = require("../controllers/sucursales.controller");

router.get("/sucursal/searchBar", isAuth, sucursalesController.getSucursalesSearchBar);

router.post("sucursal/modificar", isAuth, sucursalesController.sucursalModificar);

router.post("sucursal/eliminar", isAuth, sucursalesController.eliminarSucursal);

router.post("sucursal/crear", isAuth, sucursalesController.crearSucursal);

