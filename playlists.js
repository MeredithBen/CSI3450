const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

module.exports = {
    getPlaylistsPage: (req, res) => {
        res.render('playlists.ejs');
    },
    //this is just sample code
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