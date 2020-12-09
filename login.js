const mysqlConnection = require('../connection');
var express = require('express');
var router = express.Router();


//get login page route
router.get('/', (req, res) => {
    res.render('login');
})


// login action
router.post('/auth', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    //check if user exists
    if (username && password) {
        mysqlConnection.query('SELECT * FROM user WHERE user_name = ? AND user_pw = ?', [username, password], function(err, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
                console.log('Login Successful');
            } else {
                res.send('Incorrect Username and/or Password!');
            }           
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
})

module.exports = router;