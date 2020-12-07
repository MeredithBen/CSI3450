const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');




module.exports = {
    getProfilePage: (req, res) => {
        res.render('profile.ejs');
    },
    changeUsername: (req, res) => {
        //we get the userID by setting request.session.userID = userID after their login was authenticated
            //let userID = request.session.userID; (or something like this)
        let oldName = "SELECT user_name FROM user WHERE user_id = " + userID;
        let newName = req.body.new_name;
        let changeNameQuery = "UPDATE user SET user_name = REPLACE(user_name, " + oldName + "," + newName + ")";
        mysqlConnection.query(changeNameQuery, (err) => {
            if (err) {
                throw err;
            } else {
                console.log("The username was changed successfully.");
                res.send("Your new username has been saved!");
            }
        });
    },
    setFavDecades: (req, res) => {
        let favDec1 = req.body.favDec1;
        let favDec2 = req.body.favDec2;
        let favDec3 = req.body.favDec3;
        if (favDec1) {
            decQuery = "UPDATE user SET fav_dec_1 = '\"" + favDec1 + "'\"";
            mysqlConnection.query(decQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("First Favorite Decade added successfully.");
                    res.send("Your favorites have been saved!");
                }
            });
        }
        if (favDec2) {
            decQuery = "UPDATE user SET fav_dec_2 = '\"" + favDec2 + "'\"";
            mysqlConnection.query(decQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Second Favorite Decade added successfully.");
                    res.send("Your favorites have been saved!");
                }
            });
        }
        if (favDec3) {
            decQuery = "UPDATE user SET fav_dec_3 = '\"" + favDec3 + "'\"";
            mysqlConnection.query(decQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Third Favorite Decade added successfully.");
                    res.send("Your favorites have been saved!");
                }
            });
        }
    },

    setFavGenres: (req, res) => {
        let favGen1 = req.body.favGen1;
        let favGen2 = req.body.favGen2;
        let favGen3 = req.body.favGen3;
        if (favGen1) {
            genQuery = "UPDATE user SET fav_gen_1 = '\"" + favGen1 + "'\"";
            mysqlConnection.query(genQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("First Favorite Genre added successfully.");
                    res.send("Your favorites have been saved!");
                }
            });
        }
        if (favGen2) {
            genQuery = "UPDATE user SET fav_gen_2 = '\"" + favGen2 + "'\"";
            mysqlConnection.query(genQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Second Favorite Genre added successfully.");
                    res.send("Your favorites have been saved!");
                }
            });
        }
        if (favGen3) {
            genQuery = "UPDATE user SET fav_gen_3 = '\"" + favGen3 + "'\"";
            mysqlConnection.query(genQuery, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Third Favorite Genre added successfully.");
                    res.send("Your favorites have been saved!");
                }
            });
        }
    }

}