const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

//this is just sample code
module.exports = {
    searchByArtist: (req, res) => {
        let searchQuery = "SELECT * FROM playlists LIMIT 15";
        mysqlConnection.query(searchQuery, (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    }

}