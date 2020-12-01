const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

//this is just sample code
module.exports = {
    login: (req, res) => {
        let loginQuery = "SELECT * FROM playlists LIMIT 15";
        mysqlConnection.query(loginQuery, (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    },

    createNewUser: (req, res) => {
        var userName = req.body.username; //change to whatever the td value is for the username
        var passWord = req.body.password; //this will probably be slightly more complicated bc its a pw
        let userQuery = "INSERT INTO user(user_name, user_pw) VALUES(" + userName + ", " + passWord + ")";
        mysqlConnection.query(userQuery, (err) => {
            if (err) {
                throw err;
            } else {
                console.log("The user was added successfully!");
                res.send("Welcome to Trouvaille!");
            }
        });
    }

}