const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", //your password here
    database: "mydb", //whatever you name it
    multipleStatements: true
})

mysqlConnection.connect(function (err) {
    if (!err) {
        console.log("Connected!");
    } if (err) {
        console.log("Connection Failed." + err);
    }

})

module.exports = mysqlConnection;