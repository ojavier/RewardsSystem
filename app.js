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

// Middleware para mostrar en consola
app.use((request, response, next) => {
    console.log('Middleware!');
    next(); 
});

// Rutas principales
const mainRoutes = require('./routes/main.routes.js');
app.use('/', mainRoutes);

// Manejo de errores 404
app.use((request, response, next) => {
    response.status(404).render('404', {});
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
