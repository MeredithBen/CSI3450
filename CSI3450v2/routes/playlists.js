const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

//this is just sample code
module.exports = {
    returnPlaylist: (req, res) => {
        let playlistQuery = "SELECT * FROM playlists LIMIT 15";
        mysqlConnection.query(playlistQuery, (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    }
    
}