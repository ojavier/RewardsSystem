const express = require('express');
const router = express.Router();
const isAuth = require('../Util/is-auth');

sucursalesController = require("../Controllers/sucursales.controller")

router.get("/sucursal/searchBar", isAuth, sucursalesController.getSucursalesSearchBar);

