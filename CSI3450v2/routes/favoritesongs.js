const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');


module.exports = {
    getFavSongsPage: (req, res) => {
        res.render('favoritesongs.ejs');
    },
    //this is just sample code
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