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
    }

}