const Sequelize = require('sequelize');

const connectionDB = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: process.env.DATABASE_PORT,
    logging: console.log, // to show in the console some information 
});

module.exports= connectionDB;