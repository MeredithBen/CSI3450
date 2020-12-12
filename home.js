'use strict';
var express = require('express');
var router = express.Router();


//redirect user after logging in
router.get('/', function(req, res) {
    if (req.session.loggedin) {
        res.render('home', {username : req.session.username});
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
})

module.exports = router;

