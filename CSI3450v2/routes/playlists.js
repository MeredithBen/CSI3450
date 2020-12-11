const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

module.exports = {
    getPlaylistsPage: (req, res) => {
        res.render('playlists.ejs');
    },
    //this is just sample code
    returnPlaylists: (req, res) => {
        let playlistQuery = "SELECT song_name, name1.plist_name FROM song " + 
            "JOIN(SELECT song_id, name2.plist_name FROM song_playlist_link " +
            "JOIN(SELECT name3.plist_id, name3.plist_name FROM user_playlist_link " +
            "JOIN(SELECT * FROM playlists) AS name3 " +
            "ON user_playlist_link.plist_id = name3.plist_id " +
            "WHERE user_id = 3) AS name2 " + 
	        "ON name2.plist_id = song_playlist_link.plist_id) AS name1 " +
            "ON name1.song_id = song.song_id" 
        mysqlConnection.query(playlistQuery, (err, rows) => {
            if (err) throw err;
            res.send(rows); //res.render('/playlists', {playlists: rows});
        });
    }
    
}