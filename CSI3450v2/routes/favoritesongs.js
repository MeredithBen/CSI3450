const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

//this is just sample code
module.exports = {
    returnFavSongs: (req, res) => {
        let favSongQuery = "SELECT * FROM user_fav_songs LIMIT 15";
        mysqlConnection.query(favSongQuery, (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    }

}