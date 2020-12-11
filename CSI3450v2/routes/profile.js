const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');


module.exports = {
    getProfilePage: (req, res) => {
        res.render('profile.ejs');
    },
    changeUsername: (req, res) => {
        let oldName = req.session.username
        let newName = req.body.new_name;
        let changeNameQuery = "UPDATE user SET user_name = REPLACE(user_name, '" + oldName + "','" + newName + "')";
        mysqlConnection.query(changeNameQuery, (err) => {
            if (err) {
                throw err;
            } else {
                console.log("The username was changed successfully.");
                //res.send("Your new username has been saved!");
            }
        });
    },
    setUserFavorites: (req, res) => {
        let favDec1 = req.body.favDec1;
        let favDec2 = req.body.favDec2;
        let favDec3 = req.body.favDec3;
        console.log("Your favorite decades:", favDec1, favDec2, favDec3);
        let favGen1 = req.body.favGen1;
        let favGen2 = req.body.favGen2;
        let favGen3 = req.body.favGen3;
        console.log("Your favorite genres are: ", favGen1, favGen2, favGen3);

        if (favGen1) {
            console.log("favGen1");
            genQuery = "UPDATE user SET fav_genre_1 = '\"" + favGen1 + "\"' WHERE user_name = 'johnny'";
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
            genQuery = "UPDATE user SET fav_genre_2 = '\"" + favGen2 + "\"' WHERE user_name = 'johnny'";
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
            genQuery = "UPDATE user SET fav_genre_3 = '\"" + favGen3 + "\"' WHERE user_name = 'johnny'";
            mysqlConnection.query(genQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Third Favorite Genre added successfully.");
                }
            });
        }
        if (favDec1) {
            decQuery = "UPDATE user SET fav_dec_1 = " + favDec1 + " WHERE user_name = 'johnny'"; //these will also be changed to req.session.username
            mysqlConnection.query(decQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("First Favorite Decade added successfully.");
                }
            });
        }
        if (favDec2) {
            decQuery = "UPDATE user SET fav_dec_2 = " + favDec2 + " WHERE user_name = 'johnny'";
            mysqlConnection.query(decQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Second Favorite Decade added successfully.");
                }
            });
        }
        if (favDec3) {
            decQuery = "UPDATE user SET fav_dec_3 = " + favDec3 + " WHERE user_name = 'johnny'";
            mysqlConnection.query(decQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Third Favorite Decade added successfully.");
                }
            });
        }
    }

}