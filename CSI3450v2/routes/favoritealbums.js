const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');


module.exports = {
    getFavAlbumsPage: (req, res) => {
        res.render('favoritealbums.ejs');
    },
    //this is just sample code
    returnFavAlbums: (req, res) => {
        let favAlbumQuery = "SELECT * FROM user_fav_albums LIMIT 15";
        mysqlConnection.query(favAlbumQuery, (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    }

}