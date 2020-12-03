'use strict';
var express = require('express');
var router = express.Router();

module.exports = {
    getHomePage: (req, res) => {
        res.render('home.ejs');
    },
}
