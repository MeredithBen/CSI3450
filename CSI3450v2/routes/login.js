const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');


module.exports = {
    getLoginPage: (req, res) => {
        res.render('login.ejs');
    },
    getNewUserPage: (req, res) => {
        console.log("getNewUserPage function");
        res.render('newuser.ejs');
    },
    createNewUser: (req, res) => {
        console.log("createNewUser function");
        global.uid = req.body.username;
        var userName = req.body.username; //change to whatever the td value is for the username
        var passWord = req.body.password; //this will probably be slightly more complicated bc its a pw
        let userQuery = "INSERT INTO user(user_name, user_pw) VALUES('" + userName + "', '" + passWord + "' )";
        console.log("query: ", userQuery);
        mysqlConnection.query(userQuery, (err) => {
            if (err) {
                throw err;
            } else {
                console.log("The user was added successfully!");
                res.redirect('/login');
            }
        });
    }

}