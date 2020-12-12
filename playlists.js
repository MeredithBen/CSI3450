const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');


//get favoritesongs page route
router.get('/', (req, res) => {

    mysqlConnection.query('SELECT * FROM playlists LIMIT 100', (err, rows) => {

    console.log(rows);
});

    let userIDQuery = "SELECT user_id FROM user WHERE user_name = " + "'" + req.session.username + "'";
    mysqlConnection.query(userIDQuery, (err, results) => {
        if (err) throw err;
        let userID = results[0].user_id;

        let playlistQuery = "SELECT song_name, name1.plist_name FROM song " +
            "JOIN(SELECT song_id, name2.plist_name FROM song_playlist_link " +
            "JOIN(SELECT name3.plist_id, name3.plist_name FROM user_playlist_link " +
            "JOIN(SELECT * FROM playlists) AS name3 " +
            "ON user_playlist_link.plist_id = name3.plist_id " +
            "WHERE user_id = " + userID + ") AS name2 " +
            "ON name2.plist_id = song_playlist_link.plist_id) AS name1 " +
            "ON name1.song_id = song.song_id"
        mysqlConnection.query(playlistQuery, (err, result) => {
            if (err) throw err;
            res.render('playlists', {
                playlists : result
            }); 
        });
    });   
})
  
  router.post('/create', function(req, res) {
    var playlistName = req.body.createPlaylist;
    console.log(playlistName);

    mysqlConnection.query('INSERT INTO playlists (plist_id, plist_name) VALUES (DEFAULT, ?)', [playlistName], (err, results, fields) => {
        if (err) throw err;
        console.log(results, 'Playlist Creation Successful!');
        });
    
    mysqlConnection.query('SELECT * FROM playlists LIMIT 100', (err, rows) => {

        console.log(rows);
        res.render('playlists', {
            playlists : rows
            });
        });
    })  
    
    router.post('/add', function(req, res) {
        var addSong = req.body.addSong;
        var addToPlaylist = req.body.playlistName; 
        console.log(addSong);

        let songIdQuery = "SELECT song_id FROM song WHERE song_name = " + "'\"" + addSong + "\"'";  
        let playlistIdQuery = "SELECT plist_id FROM playlists WHERE plist_name = " + "'" + addToPlaylist + "'"; 
        let songLinkQuery = 'INSERT INTO song_playlist_link (song_id, plist_id) VALUES (?, ?)'; 
        
        mysqlConnection.query(songIdQuery, (err, results) => {
            if (err) throw err;
            console.log(results); 
        mysqlConnection.query(playlistIdQuery, (err, result) => {
                if (err) throw err;
                console.log(result);
        mysqlConnection.query(songLinkQuery, [results[0].song_id, result[0].plist_id], (err, rows) => {
            if (err) throw err; 
            res.render('playlists', {
                playlists : rows
                });
            })
        })  
    })
})


module.exports = router; 