const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

//this is just sample code
module.exports = {
    searchByArtist: (req, res) => {
        let searchQuery = "SELECT * FROM playlists LIMIT 15";
        mysqlConnection.query(searchQuery, (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    }, 
    search: (req, res) => {
        var artist = req.body.searchArtist;
        var song = req.body.searchSong;
        var genre = req.body.searchGenre;
        var decade = req.body.searchDecade;
        var resultsArray = [];
        if (song) {
            var songGenre;
            getSongGenre = "SELECT song_genre FROM song WHERE song_name = " + song;
            mysqlConnection.query(getSongGenre, (err, rows) => {
                if (err) throw err;
                songGenre = rows[0]; //I think it will be returned as an array even if one row but should double check
            });
            songSearchQuery = "SELECT song_name FROM song WHERE song_genre = " + songGenre;
            mysqlConnection.query(songSearchQuery, (err, rows) => {
                if (err) throw err;
                resultsArray.push(rows);
            });
        }
        if (artist) {
            var artistID;
            getArtistID = "SELECT artist_id FROM artist WHERE artist_name = " + artist;
            mysqlConnection.query(getArtistID, (err, rows) => {
                if (err) throw err;
                artistID = rows[0];
            });
            artistSearchQuery = "SELECT song_name FROM artist_song_link JOIN song USING song_id WHERE artist_id = " + artistID;
            mysqlConnection.query(artistSearchQuery, (err, rows) => {
                if (err) throw err;
                resultsArray.push(rows);
            });
        }
        if (genre) {
            genreSearchQuery = "SELECT song_name FROM song WHERE song_genre = " + genre;
            mysqlConnection.query(genreSearchQuery, (err, rows) => {
                if (err) throw err;
                resultsArray.push(rows);
            });
        }
        if (decade) {
            var bottom = Math.floor(decade / 10) * 10;
            var top = (Math.ceil(decade / 10) * 10) - 1;
            decadeSearchQuery = "SELECT song_name FROM song JOIN album USING album_id WHERE album_year BETWEEN " +
                bottom + " AND " + top;
            mysqlConnection.query(decadeSearchQuery, (err, rows) => {
                if (err) throw err;
                resultsArray.push(rows);
            });
        }

        //now we take the entire results array and randomly choose 15 songs to output
        var randomArr = [];
        while (randomArr.length < min(resultsArray.length, 15)) { //because we output 15 songs to the user
            var r = Math.floor(Math.random() * Math.floor(resultsArray.length));
            if (randomArr.indexOf(r) === -1) {
                randomArr.push(r);
            }
        }
        outputArray = []
        for (i = 0; i < resultsArray.length; i++) {
            outputArray[i] = resultsArray[randomArr[i]];
        }

        res.send(outputArray);
    }


}