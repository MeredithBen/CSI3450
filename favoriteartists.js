const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');



module.exports = {
    getFavArtistsPage: (req, res) => {
        let query = 'SELECT * FROM artist LIMIT 100';
        //execute query
        mysqlConnection.query(query, (err, rows) => {
            if (err) {
                throw err;
            }
            console.log(rows);
            res.render('favoriteartists',{
                artist : rows
            })
        })
    }
}