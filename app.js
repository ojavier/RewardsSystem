const express = require('express');
const app = express();

app.use(express.static('public'));
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    console.log('Middleware!');
    next(); 
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const mainRoutes = require('./Routes/main.routes.js');
app.use('/', mainRoutes);

app.use((request, response, next) => {
  response.status(404).render('404', {});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
