const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

router.get('/', (req, res) => {
    res.render('profile', {username : req.session.username});
})
   
    router.post('/save'), (req, res) => {
        var username = req.session.username;
        let favDec1 = req.body.decade1;
        let favDec2 = req.body.decade2;
        let favDec3 = req.body.decade3;
        console.log("Your favorite decades:", favDec1, favDec2, favDec3);
        let favGen1 = req.body.genre1;
        let favGen2 = req.body.genre2;
        let favGen3 = req.body.genre3;
        console.log("Your favorite genres are: ", favGen1, favGen2, favGen3);
        

        if (favGen1) {
            console.log("favGen1");
            genQuery = "UPDATE user SET fav_genre_1 = '\"" + favGen1 + "\"' WHERE user_name = " + username;
            mysqlConnection.query(genQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("First Favorite Genre added successfully.");
                    }
                });
            }
        if (favGen2) {
            console.log("favGen2");
            genQuery = "UPDATE user SET fav_genre_2 = '\"" + favGen2 + "\"' WHERE user_name = " + username;
            mysqlConnection.query(genQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Second Favorite Genre added successfully.");
                    }
                });
            }
        if (favGen3) {
            console.log("favGen3");
            genQuery = "UPDATE user SET fav_genre_3 = '\"" + favGen3 + "\"' WHERE user_name = " + username;
            mysqlConnection.query(genQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Third Favorite Genre added successfully.");
                    }
                });
            }
        if (favDec1) {
            decQuery = "UPDATE user SET fav_dec_1 = " + favDec1 + " WHERE user_name = " + username; 
            mysqlConnection.query(decQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("First Favorite Decade added successfully.");
                    }
                });
            }
        if (favDec2) {
            decQuery = "UPDATE user SET fav_dec_2 = " + favDec2 + " WHERE user_name = " + username;
            mysqlConnection.query(decQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Second Favorite Decade added successfully.");
                    }
                });
            }
        if (favDec3) {
            decQuery = "UPDATE user SET fav_dec_3 = " + favDec3 + " WHERE user_name = " + username;
            mysqlConnection.query(decQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Third Favorite Decade added successfully.");
                    }
                });
            }
            res.redirect('home');
        }


module.exports = router; 