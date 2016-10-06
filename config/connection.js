const mysql = require('mysql');
const config = require('../env/develop').mysql

module.exports = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
});


