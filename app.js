require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const connectionDB = require('./config/db/connection');
require('./config/db/asociations');

const PORT = process.env.PORT || 3000; 

//  Templating Engine
app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs');

//  Static Files
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/api/1.0/', require('./app/routes'))

app.use('/', require('./src/routes'));

//  Connection to the database
connectionDB.sync( { force: true} )
    .then( () => {
        console.log('Connection has been established successfully.')
    })
    .catch( (error) => console.log('Unable to connect to the database: ', error));

app.listen(PORT, () => {
    console.log(`It is runing on port ${PORT}`);
});

