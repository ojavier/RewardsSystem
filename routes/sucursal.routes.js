const express = require('express');
const router = express.Router();
const isAuth = require('../Util/is-auth');

sucursalesController = require("../Controllers/sucursales.controller")

router.get("/sucursal/searchBar", isAuth, sucursalesController.getSucursalesSearchBar);

router.post("sucursal/modificar", isAuth, sucursalesController.sucursalModificar);

router.post("sucursal/eliminar", isAuth, sucursalesController.eliminarSucursal);

