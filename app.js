const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Configuración de la vista
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware para procesar JSON
app.use(express.json());

// Middleware para procesar datos URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de sesión
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
}));

// Middleware para manejar las variables de sesión en todas las vistas
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    res.locals.permisos = req.session.permisos || [];
    res.locals.usuario = req.session.usuario || {};
    res.locals.establecimientos = req.session.establecimientos || [];
    res.locals.establecimiento_id = req.session.establecimiento_id || '';
    next();
});

// Rutas de usuario
const usuarioRoutes = require('./routes/usuario.routes.js');
app.use('/usuario', usuarioRoutes);

// Rutas de etapa
const etapaRoutes = require('./routes/etapa.routes.js');
app.use('/etapa', etapaRoutes);

// Rutas principales
const mainRoutes = require('./routes/main.routes.js');
app.use('/', mainRoutes);

// Manejo de errores 404
app.use((request, response, next) => {
    response.status(404).render('404', {
        pagePrimaryTitle: 'Página no encontrada',
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
