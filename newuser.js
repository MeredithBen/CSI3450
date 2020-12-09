const mysqlConnection = require('../connection');
var express = require('express');
var router = express.Router();

//get newuser page route
router.get('/', (req, res) => {
    res.render('newuser');
})

router.post('/reg', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var body = req.body;
    console.log(body);

    mysqlConnection.query('INSERT INTO user (user_id, user_pw, user_name, fav_genre_1, fav_genre_2, fav_genre_3, fav_dec_1, fav_dec_2, fav_dec_3) VALUES (DEFAULT, ?, ?, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT)', [password, username], function (err, results, fields) {
        if (err) throw err;
        res.redirect('/login');
        console.log(body, 'Data Insertion Successful');
        res.end();
        });
    })


module.exports = router;
