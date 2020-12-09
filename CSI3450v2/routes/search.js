const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');


module.exports = {
    getSearchPage: (req, res) => {
        console.log("logging from getSearchPage function")
        res.render('search.ejs');
    },
    search: (req, res) => {
        var artist = req.body.searchArtist;
        var song = req.body.searchSong;
        var genre = req.body.searchGenre;
        var decade = req.body.searchDecade;

        function queryForSong() {
            var songResultsArray = [];
            var songGenre;
            getSongGenre = "SELECT song_genre FROM song WHERE song_name = '\"" + song + "\"'";
            return new Promise(function (resolve, reject) {
                mysqlConnection.query(getSongGenre, (err, rows) => {
                    if (err) reject(err);
                    var row = rows[0];
                    songGenre = row.song_genre;

                    songSearchQuery = "SELECT song_name FROM song WHERE song_genre = " + "'" + songGenre + "'";
                    mysqlConnection.query(songSearchQuery, (err, rows) => {
                        if (err) throw err;
                        Object.keys(rows).forEach(function (key) {
                            var row = rows[key];
                            var song = row.song_name.replace(/"/g, "");
                            songResultsArray.push(song);
                        });
                        resolve(songResultsArray);
                    });
                });
            });
        }
        function queryForArtist() {
            var artistResultsArray = [];
            var artistID;
            getArtistID = "SELECT artist_id FROM artist WHERE artist_name = '\"" + artist + "\"'";
            return new Promise(function (resolve, reject) {
                mysqlConnection.query(getArtistID, (err, rows) => {
                    if (err) reject(err);
                    artistID = rows[0].artist_id;
                    console.log(rows, artistID);

                    artistSearchQuery = "SELECT song_name FROM song JOIN artist_song_link ON artist_song_link.song_id = song.song_id WHERE artist_id = " + artistID;
                    mysqlConnection.query(artistSearchQuery, (err, rows) => {
                        if (err) throw err;
                        Object.keys(rows).forEach(function (key) {
                            var row = rows[key];
                            var song = row.song_name.replace(/"/g, "");
                            artistResultsArray.push(song);
                        });
                        resolve(artistResultsArray);
                    });
                });
            });
        }

        function queryForGenre() {
            var genreResultsArray = [];
            genreSearchQuery = "SELECT song_name FROM song WHERE song_genre = '\"" + genre + "\"'";
            return new Promise(function (resolve, reject) {
                mysqlConnection.query(genreSearchQuery, (err, rows) => {
                    if (err) reject(err);
                    Object.keys(rows).forEach(function (key) {
                        var row = rows[key];
                        var song = row.song_name.replace(/"/g, "");
                        genreResultsArray.push(song);
                    });
                    resolve(genreResultsArray);
                });
            });
        }
        function queryForDecade() {
            var decadeResultsArray = [];
            console.log("A decade was searched!");
            var bottom = Math.floor(decade / 10) * 10;
            var top = bottom + 9;
            decadeSearchQuery = "SELECT song_name FROM song JOIN album ON song.album_id = album.album_id WHERE album_year BETWEEN " +
                bottom + " AND " + top;
            return new Promise(function (resolve, reject) {
                mysqlConnection.query(decadeSearchQuery, (err, rows) => {
                    if (err) reject(err);
                    Object.keys(rows).forEach(function (key) {
                        var row = rows[key];
                        var song = row.song_name.replace(/"/g, "");
                        decadeResultsArray.push(song);
                    });
                    resolve(decadeResultsArray);
                });
            });
        }
        async function handleResults() {
            var arr = [];
            if (song) {
                let resolveVal = await queryForSong();
                resolveVal.forEach(function (name) {
                    arr.push(name);
                });
            }
            if (artist) {
                let resolveVal = await queryForArtist();
                resolveVal.forEach(function (name) {
                    arr.push(name);
                });
            }
            if (genre) {
                let resolveVal = await queryForGenre();
                resolveVal.forEach(function (name) {
                    arr.push(name);
                });
            }
            if (decade) {
                let resolveVal = await queryForDecade();
                resolveVal.forEach(function (name) {
                    arr.push(name);
                });
            }
            return arr;
        }
        handleResults().then((value) => {
            var randomArr = [];
            var count = 0;
            while (randomArr.length < Math.min(value.length, 15)) { 
                var r = Math.floor(Math.random() * Math.floor(value.length)); 
                console.log("Random number: ", r);
                if (randomArr.indexOf(r) === -1) {
                    console.log("testing", count);
                    randomArr.push(r);
                    count++;
                }
            }
            outputArray = [];
            for (i = 0; i < 15; i++) {
                outputArray.push(value[randomArr[i]]);
            }
            console.log("The output array: ", outputArray);
            res.render('search.ejs', { outputArray: outputArray }); //this is where the output array gets sent to the frontend!
        });
    }

}