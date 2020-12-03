const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');


module.exports = {
    getLoginPage: (req, res) => {
        res.render('login.ejs');
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