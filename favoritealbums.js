const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');



module.exports = {
    getFavAlbumsPage: (req, res) => {
        let query = 'SELECT * FROM album LIMIT 100';
        //execute query
        mysqlConnection.query(query, (err, rows) => {
            if (err) {
                throw err;
            }
            console.log(rows);
            res.render('favoritealbums',{
                album : rows
            })
        })
    }
}