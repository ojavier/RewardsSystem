const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Configuración de la vista
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware para procesar JSON
app.use(express.json()); // Añade esto para manejar solicitudes JSON

// Middleware para procesar datos URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

const session = require('express-session');
app.use(session({
    secret: 'mySecretKey',
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
    cookie: {
        maxAge: 1000 * 60 * 30 // Tiempo de vida de la cookie (15 minutos en este caso)
    }
}));

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
        isLoggedIn: request.session.isLoggedIn || false,
        establecimientos: request.session.establecimientos || [],
        id_Establecimiento: request.query.id_Establecimiento || [],
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//Socios