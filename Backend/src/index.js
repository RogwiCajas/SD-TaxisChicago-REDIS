// Constantes
const express = require('express');
const mongoose = require('mongoose');
const taxiRoutes = require('./routes/taxi');  
require('dotenv').config();
const responseTime = require("response-time")

const app = express();
const port = process.env.port || 9000;

// Middlewares
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.json());
app.use(responseTime());
app.use('/api', taxiRoutes);

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a la aplicacion de taxis de Chicago!');
});

// Conexion a MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a la base de datos en MongoDB Atlas!'))
    .catch((error) => console.log('Uy, algo salió mal! ', error));

app.listen(port, () => console.log('El servidor funciona en el puerto ', port));