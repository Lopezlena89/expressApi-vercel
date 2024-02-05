const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
console.log( dbConnection);
//Crear servidor de express
const app = express();
//Base de datos
dbConnection();
//Cors
app.use(cors())
//Directorio publico
app.use( express.static('public') );
//Lectura y parseo del body
app.use( express.json() );
//Rutas
app.use('/api/auth', require('./api/auth') );
app.use('/api', require('./api/messages'));
app.use('/api/group', require('./api/group'));


const port = process.env.PORT || 4000


//Escuchar peticiones

app.listen( port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});

