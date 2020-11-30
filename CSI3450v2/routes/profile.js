const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

//this is just sample code
module.exports = {
    changeUsername: (req, res) => {
        let usernameQuery = "SELECT * FROM playlists LIMIT 15";
        mysqlConnection.query(usernameQuery, (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    }

}