const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');



module.exports = {
    getFavSongsPage: (req, res) => {
        let query = 'SELECT * FROM song LIMIT 100';
        //execute query
        mysqlConnection.query(query, (err, rows) => {
            if (err) {
                throw err;
            }
            console.log(rows);
            res.render('favoritesongs',{
                song : rows
            })
        })
    }
}