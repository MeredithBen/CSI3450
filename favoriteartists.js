const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');


//get favoriteartists page route
router.get('/', (req, res) => {
   

    let artistIdQuery = 'SELECT * FROM user_fav_artists LIMIT 100';
    let artistNameQuery = 'SELECT artist_name FROM artist WHERE artist_id IN (SELECT artist_id FROM user_fav_artists) LIMIT 100';
    //execute query
    mysqlConnection.query(artistIdQuery, function(err, results) {
        if (err) {
            throw err;
        }
        console.log(results);
       
        mysqlConnection.query(artistNameQuery, [results], function(err, rows) {
            if (err) throw err;
            console.log(rows);
            res.render('favoriteartists',{
                artist : rows
            })
        })
    })
})

router.post('/add', function(req, res) {
    var addArtist = req.body.addArtist;
    var username = req.session.username;
    console.log(addArtist);

    let artistIdQuery = "SELECT artist_id FROM artist WHERE artist_name = " + "'\"" + addArtist + "\"'";
    let userIdQuery = "SELECT user_id FROM user WHERE user_name = " + "'" + username + "'";
    let linkQuery = 'INSERT INTO user_fav_artists (user_id, artist_id) VALUES (?, ?)';

    mysqlConnection.query(artistIdQuery, (err, results) => {
        if (err) throw err;
        console.log(results);
    mysqlConnection.query(userIdQuery, (err, result) => {
        if (err) throw err;

    mysqlConnection.query(linkQuery, [result[0].user_id, results[0].artist_id], (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.render('favoriteartists', {
          artist : rows
        })
      })
    })
  })
})

router.post('/remove', function(req, res) {
    var removeArtist = req.body.removeArtist;
    var username = req.session.username;
    console.log(removeArtist);

    let artistIdQuery2 = "SELECT artist_id FROM artist WHERE artist_name = " + "'\"" + removeArtist + "\"'";
    let userIdQuery2 = "SELECT user_id FROM user WHERE user_name = " + "'" + username + "'";
    let linkQuery2 = 'DELETE FROM user_fav_artists WHERE (user_id, artist_id) IN ((?, ?))';

    mysqlConnection.query(artistIdQuery2, (err, results) => {
        if (err) throw err;
        console.log(results);
    mysqlConnection.query(userIdQuery2, (err, result) => {
        if (err) throw err;

    mysqlConnection.query(linkQuery2, [result[0].user_id, results[0].artist_id], (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.render('favoriteartists', {
          artist : rows
        })
      })
    })
  })
}) 

module.exports = router; 