require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const passport = require('./config/passport/passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const connectionDB = require('./config/db/connection');
require('./config/db/asociations');

const PORT = process.env.PORT || 3000; 

//  Templating Engine
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

//  Static Files
app.use(express.static(path.join(__dirname, 'public')))
app.use('/modules', express.static(path.join(__dirname, 'node_modules')));
// Enable to read data from forms
app.use(express.urlencoded( {extended: false} ));
app.use(express.json());

// For Login session 
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
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

