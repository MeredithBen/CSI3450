//imports
'use strict';
var debug = require('debug');
var path = require('path');
var bodyParser = require('body-parser');
var ejs = require('ejs');
const express = require('express');
const { isBuffer } = require('util');
const app = express()
const port = 3000
//const mysqlConnection = require('./connection');
const { changeUsername, setFavDecades, setFavGenres } = require('./routes/profile');
//var session = require('express-session');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');




// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))


//set views
app.set('port', process.env.port || port);
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//page paths
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/profile', (req, res) => {
    res.render('profile')    
})
app.get('/playlists', (req, res) => {
    res.render('playlists')
})
app.get('/favoritesongs', (req, res) => {
    res.render('favoritesongs')
})
app.get('/home', (req, res) => {
    res.render('home')
})
app.get('/search', (req, res) => {
    res.render('search')
})
app.get('/favoriteartists', (req, res) => {
    res.render('favoriteartists')
})
app.get('/favoritealbums', (req, res) => {
    res.render('favoritealbums')
})


//define routes
const {getLoginPage} = require('./routes/login');
const {getSearchPage} = require('./routes/search');
const {getProfilePage} = require('./routes/profile');
const {getPlaylistsPage} = require('./routes/playlists');
const {getFavSongsPage} = require('./routes/favoritesongs');
const {getFavArtistsPage} = require('./routes/favoriteartists');
const {getFavAlbumsPage} = require('./routes/favoritealbums');
const {getHomePage} = require('./routes/home');

//connect routes and views
app.get('/login', getLoginPage); 
app.get('/search', getSearchPage);
app.get('/profile', getProfilePage);
app.get('/playlists', getPlaylistsPage);
app.get('/favoritesongs', getFavSongsPage);
app.get('/favoriteartists', getFavArtistsPage);
app.get('/favoritealbums', getFavAlbumsPage);
app.get('/home', getHomePage);


/* app.post('/profile', changeUsername)
app.post('/profile', setFavDecades)
app.post('/profile', setFavGenres)
app.post('/login', login);
app.post('/search', search); */

// listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))


//catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


