const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

//get favoritesongs page route
router.get('/', (req, res) => {
   

        let songIdQuery = 'SELECT * FROM user_fav_songs LIMIT 100';
        let songNameQuery = 'SELECT song_name FROM song WHERE song_id IN (SELECT song_id FROM user_fav_songs) LIMIT 100';
        //execute query
        mysqlConnection.query(songIdQuery, function(err, results) {
            if (err) {
                throw err;
            }
            console.log(results);
           
            mysqlConnection.query(songNameQuery, [results], function(err, rows) {
                if (err) throw err;
                console.log(rows);
                res.render('favoritesongs',{
                    song : rows
                })
            })
        })
    })
    
    router.post('/add', function(req, res) {
        var addSong = req.body.addSong;
        var username = req.session.username;
        console.log(addSong);

        let songIdQuery = "SELECT song_id FROM song WHERE song_name = " + "'\"" + addSong + "\"'";
        let userIdQuery = "SELECT user_id FROM user WHERE user_name = " + "'" + username + "'";
        let linkQuery = 'INSERT INTO user_fav_songs (user_id, song_id) VALUES (?, ?)';

        mysqlConnection.query(songIdQuery, (err, results) => {
            if (err) throw err;
            console.log(results);
        mysqlConnection.query(userIdQuery, (err, result) => {
            if (err) throw err;

        mysqlConnection.query(linkQuery, [result[0].user_id, results[0].song_id], (err, rows) => {
            if (err) throw err;
            console.log(rows);
            res.render('favoritesongs', {
              song : rows
            })
          })
        })
      })
    })

    router.post('/remove', function(req, res) {
        var removeSong = req.body.removeSong;
        var username = req.session.username;
        console.log(removeSong);

        let songIdQuery2 = "SELECT song_id FROM song WHERE song_name = " + "'\"" + removeSong + "\"'";
        let userIdQuery2 = "SELECT user_id FROM user WHERE user_name = " + "'" + username + "'";
        let linkQuery2 = 'DELETE FROM user_fav_songs WHERE (user_id, song_id) IN ((?, ?))';

        mysqlConnection.query(songIdQuery2, (err, results) => {
            if (err) throw err;
            console.log(results);
        mysqlConnection.query(userIdQuery2, (err, result) => {
            if (err) throw err;

        mysqlConnection.query(linkQuery2, [result[0].user_id, results[0].song_id], (err, rows) => {
            if (err) throw err;
            console.log(rows);
            res.render('favoritesongs', {
              song : rows
            })
          })
        })
      })
    }) 

    module.exports = router;
