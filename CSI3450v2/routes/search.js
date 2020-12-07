const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');


module.exports = {
    getSearchPage: (req, res) => {
        console.log("logging from getSearchPage function")
        res.render('search.ejs');
    },
    search: (req, res) => {
        console.log("logging from search function")
        var artist = req.body.searchArtist;
        var song = req.body.searchSong;
        var genre = req.body.searchGenre;
        var decade = req.body.searchDecade;
        console.log("The variables from the page: ", req.body, artist, song, genre, decade);
        var resultsArray = [];
        if (song) {
            console.log("A song was searched!");
            var songGenre;
            getSongGenre = "SELECT song_genre FROM song WHERE song_name = '\"" + song + "\"'";
            mysqlConnection.query(getSongGenre, (err, rows) => {
                if (err) throw err;
                songGenre = rows[0]; //I think it will be returned as an array even if one row but should double check
            });
            songSearchQuery = "SELECT song_name FROM song WHERE song_genre = " + songGenre;
            mysqlConnection.query(songSearchQuery, (err, rows) => {
                if (err) throw err;
                console.log("Song rows: ", rows);
                resultsArray.push(rows);
            });
        }
        if (artist) {
            var artistID;
            getArtistID = "SELECT artist_id FROM artist WHERE artist_name = '\"" + artist + "\"'";
            mysqlConnection.query(getArtistID, (err, rows) => {
                if (err) throw err;
                artistID = rows[0];
            });
            artistSearchQuery = "SELECT song_name FROM song JOIN artist_song_link ON artist_song_link.song_id = song.song_id WHERE artist_id = " + artistID;
            mysqlConnection.query(artistSearchQuery, (err, rows) => {
                if (err) throw err;
                console.log("Artist rows: ", rows);
                resultsArray.push(rows);
            });
        }
        if (genre) {
            genreSearchQuery = "SELECT song_name FROM song WHERE song_genre = '\"" + genre + "\"'";
            mysqlConnection.query(genreSearchQuery, (err, rows) => {
                if (err) throw err;
                console.log("genre rows: ", rows);
                resultsArray.push(rows);
            });
        }
        if (decade) {
            console.log("A decade was searched!");
            var bottom = Math.floor(decade / 10) * 10;
            var top = (Math.ceil(decade / 10) * 10) - 1;
            decadeSearchQuery = "SELECT song_name FROM song JOIN album ON song.album_id = album.album_id WHERE album_year BETWEEN " +
                bottom + " AND " + top;
            mysqlConnection.query(decadeSearchQuery, (err, rows) => {
                if (err) throw err;
                console.log("Decade rows: ", rows);
                resultsArray.push(rows);
            });
        }
        console.log("The results array: ", resultsArray);
        //now we take the entire results array and randomly choose 15 songs to output
        var randomArr = [];
        while (randomArr.length < Math.min(resultsArray.length, 15)) { //because we output 15 songs to the user
            var r = Math.floor(Math.random() * Math.floor(resultsArray.length));
            if (randomArr.indexOf(r) === -1) {
                randomArr.push(r);
            }
        }
        outputArray = [0, 1, 2, 3];
        for (i = 0; i < resultsArray.length; i++) {
            outputArray[i] = resultsArray[randomArr[i]];
        }
        console.log("The output array: ", outputArray);
        res.render('search.ejs', { outputArray: outputArray });
    }


}