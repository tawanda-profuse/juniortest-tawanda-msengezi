// The purpose of the method in this file is to connect nodejs to mysql and define the database parameters

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tawanda_drew',
    password: '123edf658ghu',
    database: 'products'
});

connection.connect(function(error){
    if(!error){
        console.log(error);
    } else{
        console.log('Connected...');
    }
});

module.exports = connection;