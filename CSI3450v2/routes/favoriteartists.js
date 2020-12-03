const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

//this is just sample code
module.exports = {
    getFavArtistsPage: (req, res) => {
        res.render('favoriteartists.ejs');
    },
    //this is just sample code
    returnFavArtists: (req, res) => {
        let favArtistQuery = "SELECT * FROM user_fav_songs LIMIT 15";
        mysqlConnection.query(favSongArtist, (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    }

}