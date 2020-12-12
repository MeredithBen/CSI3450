const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');


//get favoritealbums page route
router.get('/', (req, res) => {
    let albumIdQuery ='SELECT *  FROM user_fav_albums LIMIT 100';
    let albumNameQuery = 'SELECT album_name FROM album WHERE album_id IN (SELECT album_id FROM user_fav_albums) LIMIT 100';
    //execute query
    mysqlConnection.query(albumIdQuery, function(err, results) {
        if (err) {
          throw err;
      }
      console.log(results);
     
      mysqlConnection.query(albumNameQuery, [results], function(err, rows) {
          if (err) throw err;
            console.log(rows);
            res.render('favoritealbums',{
            album : rows
          })
        })
      })
    })

      router.post('/add', function(req, res) {
          var addAlbum = req.body.addAlbum;
          var username = req.session.username;
          console.log(addAlbum);

          let albumIdQuery = "SELECT album_id FROM album WHERE album_name = " + "'\"" + addAlbum + "\"'";
          let userIdQuery = "SELECT user_id FROM user WHERE user_name = " + "'" + username + "'";
          let linkQuery = 'INSERT INTO user_fav_albums (album_id, user_id) VALUES (?, ?)';

          mysqlConnection.query(albumIdQuery, (err, results) => {
              if (err) throw err;
              console.log(results);
          mysqlConnection.query(userIdQuery, (err, result) => {
              if (err) throw err;

          mysqlConnection.query(linkQuery, [results[0].album_id, result[0].user_id], (err, rows) => {
              if (err) throw err;
              console.log(rows);
              res.render('favoritealbums', {
                album : rows
              })
            })
          })
        })
      })

      router.post('/remove', function(req, res) {
          var removeAlbum = req.body.removeAlbum;
          var username = req.session.username;
          console.log(removeAlbum);

          let albumIdQuery2 = "SELECT album_id FROM album WHERE album_name = " + "'\"" + removeAlbum + "\"'";
          let userIdQuery2 = "SELECT user_id FROM user WHERE user_name = " + "'" + username + "'";
          let linkQuery2 = 'DELETE FROM user_fav_albums WHERE (album_id, user_id) IN ((?, ?))';

          mysqlConnection.query(albumIdQuery2, (err, results) => {
              if (err) throw err;
              console.log(results);
          mysqlConnection.query(userIdQuery2, (err, result) => {
              if (err) throw err;

          mysqlConnection.query(linkQuery2, [results[0].album_id, result[0].user_id], (err, rows) => {
              if (err) throw err;
              console.log(rows);
              res.render('favoritealbums', {
                album : rows
              })
            })
          })
        })
      })

module.exports = router;